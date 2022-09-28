import { MeterBuilder } from '@builders'
import { MeterAlias } from '@schema'
import type { AssetType, ConditionMeter, MeterCondition, YamlConditionMeter } from '@schema'

/**
 * @internal
 */
export class ConditionMeterBuilder extends MeterBuilder implements ConditionMeter {
  Value: number
  Min: number = 0
  Aliases?: MeterAlias[] | undefined
  constructor(yaml: YamlConditionMeter, id: string, assetType: AssetType['$id']) {
    super(yaml, id)
    this.Value = yaml.Value ?? yaml.Max
    if (assetType === 'starforged/assets/companion' || assetType === 'ironsworn/assets/companion') {
      this.Aliases = [MeterAlias.CompanionHealth]
    }
    if (assetType === 'starforged/assets/command_vehicle') {
      this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity]
    }
    if (assetType === 'starforged/assets/support_vehicle') {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ]
    }
  }
}
