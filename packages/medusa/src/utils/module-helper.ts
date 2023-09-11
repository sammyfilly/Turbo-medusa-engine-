import { ModuleResolution } from "../types/global"
import { ModulesResponse } from "../types/modules"

export class ModulesHelper {
  private modules_: Record<string, ModuleResolution> = {}

  setModules(modules: Record<string, ModuleResolution>) {
    this.modules_ = modules
  }

  get modules(): ModulesResponse {
    return Object.values(this.modules_ || {}).map((value) => ({
      module: value.definition.key,
      resolution: value.resolutionPath,
    }))
  }
}
