import { type JSONSchemaType as Schema } from 'ajv'
import {
  Assets,
  Localize,
  Metadata,
  Moves,
  type Assets as Types
} from '@df-types'
import { DF_KEY, schemaRef } from './common.js'
import _ from 'lodash'

export const AssetID: Schema<Types.AssetID> = {
  type: 'string',
  pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/.source
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

const AssetBase: Schema<Types.AssetBase> = {
  type: 'object',
  required: ['_id', 'name', 'source', 'abilities'],
  properties: {
    name: schemaRef<Localize.Label>('Label'),
    _id: schemaRef<Assets.AssetID>('AssetID'),
    source: schemaRef<Metadata.Source>('Source'),
    suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any,
    abilities: { type: 'array', minItems: 3, maxItems: 3 } as any
  }
}

export const AssetStarforged: Schema<Types.AssetStarforged> = _.merge(
  {},
  AssetBase,
  {
    properties: {
      abilities: {
        items: schemaRef<Assets.AssetAbilityStarforged>(
          'AssetAbilityStarforged'
        )
      }
    }
  }
) as Schema<Types.AssetStarforged>

export const AssetClassic = _.merge({}, AssetBase, {
  properties: {
    abilities: {
      items: schemaRef<Assets.AssetAbilityClassic>('AssetAbilityClassic')
    }
  }
}) as Schema<Types.AssetClassic>

const AssetAbilityBase = {
  type: 'object',
  required: ['text'],
  properties: {
    name: schemaRef<Localize.Label>('Label'),
    text: schemaRef<Localize.MarkdownParagraph>('MarkdownParagraph')
  }
} as Partial<Schema<Types.AssetAbilityBase>>

export const AssetAbilityStarforged = _.merge({}, AssetAbilityBase, {
  properties: {
    moves: {
      type: 'object',
      patternProperties: {
        [DF_KEY]: schemaRef<Moves.MoveStarforged>('MoveStarforged')
      }
    }
  }
}) as Schema<Types.AssetAbilityStarforged>

export const AssetAbilityClassic: Schema<Types.AssetAbilityClassic> = _.merge(
  {},
  AssetAbilityBase,
  {
    properties: {
      moves: {
        type: 'object',
        patternProperties: {
          [DF_KEY]: schemaRef<Moves.MoveClassic>('MoveClassic')
        }
      }
    }
  }
) as Schema<Types.AssetAbilityClassic>
