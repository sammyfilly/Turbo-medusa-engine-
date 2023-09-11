import { BaseService } from "medusa-interfaces"
import { MedusaError } from "medusa-core-utils"

/**
 * Handles Fulfillments
 * @extends BaseService
 */
class FulfillmentService extends BaseService {
  constructor({
    manager,
    totalsService,
    fulfillmentRepository,
    trackingLinkRepository,
    shippingProfileService,
    lineItemService,
    fulfillmentProviderService,
  }) {
    super()

    /** @private @const {EntityManager} */
    this.manager_ = manager

    /** @private @const {TotalsService} */
    this.totalsService_ = totalsService

    /** @private @const {FulfillmentRepository} */
    this.fulfillmentRepository_ = fulfillmentRepository

    /** @private @const {TrackingLinkRepository} */
    this.trackingLinkRepository_ = trackingLinkRepository

    /** @private @const {ShippingProfileService} */
    this.shippingProfileService_ = shippingProfileService

    /** @private @const {LineItemService} */
    this.lineItemService_ = lineItemService

    /** @private @const {FulfillmentProviderService} */
    this.fulfillmentProviderService_ = fulfillmentProviderService
  }

  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }

    const cloned = new FulfillmentService({
      manager: transactionManager,
      totalsService: this.totalsService_,
      trackingLinkRepository: this.trackingLinkRepository_,
      fulfillmentRepository: this.fulfillmentRepository_,
      shippingProfileService: this.shippingProfileService_,
      lineItemService: this.lineItemService_,
      fulfillmentProviderService: this.fulfillmentProviderService_,
    })

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  partitionItems_(shippingMethods, items) {
    const partitioned = []
    // partition order items to their dedicated shipping method
    for (const method of shippingMethods) {
      const temp = { shipping_method: method }

      // for each method find the items in the order, that are associated
      // with the profile on the current shipping method
      if (shippingMethods.length === 1) {
        temp.items = items
      } else {
        const methodProfile = method.shipping_option.profile_id

        temp.items = items.filter(({ variant }) => {
          variant.product.profile_id === methodProfile
        })
      }
      partitioned.push(temp)
    }
    return partitioned
  }

  /**
   * Retrieves the order line items, given an array of items.
   * @param {Order} order - the order to get line items from
   * @param {{ item_id: string, quantity: number }} items - the items to get
   * @param {function} transformer - a function to apply to each of the items
   *    retrieved from the order, should return a line item. If the transformer
   *    returns an undefined value the line item will be filtered from the
   *    returned array.
   * @return {Promise<Array<LineItem>>} the line items generated by the transformer.
   */
  async getFulfillmentItems_(order, items, transformer) {
    const toReturn = await Promise.all(
      items.map(async ({ item_id, quantity }) => {
        const item = order.items.find((i) => i.id === item_id)
        return transformer(item, quantity)
      })
    )

    return toReturn.filter((i) => !!i)
  }

  /**
   * Checks that a given quantity of a line item can be fulfilled. Fails if the
   * fulfillable quantity is lower than the requested fulfillment quantity.
   * Fulfillable quantity is calculated by subtracting the already fulfilled
   * quantity from the quantity that was originally purchased.
   * @param {LineItem} item - the line item to check has sufficient fulfillable
   *   quantity.
   * @param {number} quantity - the quantity that is requested to be fulfilled.
   * @return {LineItem} a line item that has the requested fulfillment quantity
   *   set.
   */
  validateFulfillmentLineItem_(item, quantity) {
    if (!item) {
      // This will in most cases be called by a webhook so to ensure that
      // things go through smoothly in instances where extra items outside
      // of Medusa are added we allow unknown items
      return null
    }

    if (quantity > item.quantity - item.fulfilled_quantity) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "Cannot fulfill more items than have been purchased"
      )
    }
    return {
      ...item,
      quantity,
    }
  }

  /**
   * Retrieves a fulfillment by its id.
   * @param {string} id - the id of the fulfillment to retrieve
   * @param {object} config - optional values to include with fulfillmentRepository query
   * @return {Fulfillment} the fulfillment
   */
  async retrieve(id, config = {}) {
    const fulfillmentRepository = this.manager_.getCustomRepository(
      this.fulfillmentRepository_
    )

    const validatedId = this.validateId_(id)
    const query = this.buildQuery_({ id: validatedId }, config)

    const fulfillment = await fulfillmentRepository.findOne(query)

    if (!fulfillment) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Fulfillment with id: ${id} was not found`
      )
    }
    return fulfillment
  }

  /**
   * Creates an order fulfillment
   * If items needs to be fulfilled by different provider, we make
   * sure to partition those items, and create fulfillment for
   * those partitions.
   * @param {Order} order - order to create fulfillment for
   * @param {{ item_id: string, quantity: number}[]} itemsToFulfill - the items in the order to fulfill
   * @param {object} custom - potential custom values to add
   * @return {Fulfillment[]} the created fulfillments
   */
  async createFulfillment(order, itemsToFulfill, custom = {}) {
    return this.atomicPhase_(async (manager) => {
      const fulfillmentRepository = manager.getCustomRepository(
        this.fulfillmentRepository_
      )

      const lineItems = await this.getFulfillmentItems_(
        order,
        itemsToFulfill,
        this.validateFulfillmentLineItem_
      )

      const { shipping_methods } = order

      // partition order items to their dedicated shipping method
      const fulfillments = this.partitionItems_(shipping_methods, lineItems)

      const created = await Promise.all(
        fulfillments.map(async ({ shipping_method, items }) => {
          const ful = fulfillmentRepository.create({
            ...custom,
            provider_id: shipping_method.shipping_option.provider_id,
            items: items.map((i) => ({ item_id: i.id, quantity: i.quantity })),
            data: {},
          })

          const result = await fulfillmentRepository.save(ful)

          result.data =
            await this.fulfillmentProviderService_.createFulfillment(
              shipping_method,
              items,
              { ...order },
              { ...result }
            )

          return fulfillmentRepository.save(result)
        })
      )

      return created
    })
  }

  /**
   * Cancels a fulfillment with the fulfillment provider. Will decrement the
   * fulfillment_quantity on the line items associated with the fulfillment.
   * Throws if the fulfillment has already been shipped.
   * @param {Fulfillment|string} fulfillmentOrId - the fulfillment object or id.
   * @return {Promise} the result of the save operation
   *
   */
  cancelFulfillment(fulfillmentOrId) {
    return this.atomicPhase_(async (manager) => {
      let id = fulfillmentOrId
      if (typeof fulfillmentOrId === "object") {
        id = fulfillmentOrId.id
      }
      const fulfillment = await this.retrieve(id, {
        relations: ["items", "claim_order", "swap"],
      })

      if (fulfillment.shipped_at) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          `The fulfillment has already been shipped. Shipped fulfillments cannot be canceled`
        )
      }

      await this.fulfillmentProviderService_.cancelFulfillment(fulfillment)

      fulfillment.canceled_at = new Date()

      const lineItemService = this.lineItemService_.withTransaction(manager)

      for (const fItem of fulfillment.items) {
        const item = await lineItemService.retrieve(fItem.item_id)
        const fulfilledQuantity = item.fulfilled_quantity - fItem.quantity
        await lineItemService.update(item.id, {
          fulfilled_quantity: fulfilledQuantity,
        })
      }

      const fulfillmentRepo = manager.getCustomRepository(
        this.fulfillmentRepository_
      )
      const canceled = await fulfillmentRepo.save(fulfillment)
      return canceled
    })
  }

  /**
   * Creates a shipment by marking a fulfillment as shipped. Adds
   * tracking links and potentially more metadata.
   * @param {Order} fulfillmentId - the fulfillment to ship
   * @param {TrackingLink[]} trackingLinks - tracking links for the shipment
   * @param {object} config - potential configuration settings, such as no_notification and metadata
   * @return {Fulfillment} the shipped fulfillment
   */
  async createShipment(
    fulfillmentId,
    trackingLinks,
    config = {
      metadata: {},
      no_notification: undefined,
    }
  ) {
    const { metadata, no_notification } = config

    return this.atomicPhase_(async (manager) => {
      const fulfillmentRepository = manager.getCustomRepository(
        this.fulfillmentRepository_
      )
      const trackingLinkRepo = manager.getCustomRepository(
        this.trackingLinkRepository_
      )

      const fulfillment = await this.retrieve(fulfillmentId, {
        relations: ["items"],
      })

      if (fulfillment.canceled_at) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          "Fulfillment has been canceled"
        )
      }

      const now = new Date()
      fulfillment.shipped_at = now

      fulfillment.tracking_links = trackingLinks.map((tl) =>
        trackingLinkRepo.create(tl)
      )

      if (no_notification) {
        fulfillment.no_notification = no_notification
      }

      fulfillment.metadata = {
        ...fulfillment.metadata,
        ...metadata,
      }

      const updated = fulfillmentRepository.save(fulfillment)
      return updated
    })
  }
}

export default FulfillmentService