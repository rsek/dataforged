import { type JSONSchemaType as Schema } from 'ajv'
import { Assets, type Assets as Types } from '@df-types'

export const AssetID: Schema<Types.AssetID> = {
  type: 'string'
}

export const ConditionMeterAliasStarforged: Schema<Types.ConditionMeterAliasStarforged> =
  {
    type: 'string',
    enum: [
      'companion_health',
      'attached_asset_meter',
      'vehicle_integrity',
      'command_vehicle_integrity',
      'support_vehicle_integrity',
      'incidental_vehicle_integrity'
    ]
  }

export const ConditionMeterAliasClassic: Schema<Types.ConditionMeterAliasClassic> =
  {
    type: 'string',
    enum: ['companion_health', 'attached_asset_meter']
  }
