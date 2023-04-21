import { MeterBuilder } from '@builders'
import { MeterAlias } from '@schema'
import type { AssetType, ConditionMeter, MeterCondition, YamlConditionMeter } from '@schema'

/**
 * @internal
 */
export class ConditionMeterBuilder extends MeterBuilder implements ConditionMeter {
  value: number
  min: number = 0
  aliases?: MeterAlias[] | undefined
  constructor (yaml: YamlConditionMeter, id: string, assetType: AssetType['$id']) {
    super(yaml, id)
    this.value = yaml.value ?? yaml.max
    if (assetType === 'starforged/assets/companion' || assetType === 'ironsworn/assets/companion') {
      this.aliases = [MeterAlias.CompanionHealth]
    }
    if (assetType === 'starforged/assets/command_vehicle') {
      this.aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity]
    }
    if (assetType === 'starforged/assets/support_vehicle') {
      this.aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ]
    }
  }
}
