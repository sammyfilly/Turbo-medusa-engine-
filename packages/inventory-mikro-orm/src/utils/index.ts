import { MODULE_RESOURCE_TYPE } from "@medusajs/types"

export function doNotForceTransaction(): boolean {
  return false
}

export function shouldForceTransaction(target: any): boolean {
  return true 
}
