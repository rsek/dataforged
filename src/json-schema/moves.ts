import { DF_KEY, schemaRef } from './common.js'
import * as Types from '@df-types/moves'
import { type JSONSchemaType as Schema } from 'ajv'
import {
  Assets,
  Collections,
  Localize,
  Metadata,
  Oracles,
  Players,
  Progress
} from '@df-types'
import _ from 'lodash'

export const MoveID: Schema<Types.MoveID> = {
  type: 'string',
  $comment: '{namespace}/moves/{moveCategory}/{move}'
}

export const CustomStat: Schema<any> = {} as any

export const Trigger: Schema<Types.Trigger> = {
  oneOf: [
    schemaRef<Types.TriggerStarforged>('TriggerStarforged'),
    schemaRef<Types.TriggerClassic>('TriggerClassic')
  ]
}

export const TriggerStarforged: Schema<Types.TriggerStarforged> = {
  required: ['text'],
  type: 'object',
  properties: {
    text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase') as any,
    options: {
      type: 'array',
      oneOf: [
        {
          items: schemaRef<Types.TriggerOptionProgressStarforged>(
            'TriggerOptionProgressStarforged'
          )
        },
        {
          items: schemaRef<Types.TriggerOptionActionStarforged>(
            'TriggerOptionActionStarforged'
          )
        }
      ]
    } as any
  }
}

export const TriggerClassic: Schema<Types.TriggerClassic> = {
  required: ['text'],
  type: 'object',
  properties: {
    text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase') as any,
    options: {
      type: 'array',
      oneOf: [
        {
          items: schemaRef<Types.TriggerOptionProgressClassic>(
            'TriggerOptionProgressClassic'
          )
        },
        {
          items: schemaRef<Types.TriggerOptionActionClassic>(
            'TriggerOptionActionClassic'
          )
        }
      ]
    } as any
  }
}

const TriggerOptionBase: Schema<Types.TriggerOption> = {
  type: 'object',
  required: ['text', 'method', 'using'],
  properties: {
    text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
    method: {
      title: 'RollSelectionMethod',
      type: 'string',
      oneOf: [
        { enum: ['any', 'highest', 'lowest', 'inherit', 'all'] },
        schemaRef<Types.MoveOutcomeType>('MoveOutcomeType')
      ],
      default: 'any'
    },
    using: {
      type: 'array',
      items: { type: 'string' }
    }
  }
}

export const TriggerOptionActionStarforged: Schema<Types.TriggerOptionActionStarforged> =
  {
    type: TriggerOptionBase.type,
    text: TriggerOptionBase.text,
    required: TriggerOptionBase.required,
    properties: {
      text: TriggerOptionBase.properties?.text as any,
      method: TriggerOptionBase.properties?.using as any,
      using: {
        type: 'array',
        items: schemaRef<Types.RollableStatStarforgedID>(
          'RollableStatStarforgedID'
        )
      }
    }
  }
export const TriggerOptionProgressStarforged: Schema<Types.TriggerOptionProgressStarforged> =
  {
    type: TriggerOptionBase.type,
    text: TriggerOptionBase.text,
    required: TriggerOptionBase.required,
    properties: {
      text: TriggerOptionBase.properties?.text as any,
      method: TriggerOptionBase.properties?.using as any,
      using: {
        type: 'array',
        items: schemaRef<Progress.ProgressTypeStarforged>(
          'ProgressTypeStarforged'
        )
      }
    }
  }

export const TriggerOptionActionClassic: Schema<Types.TriggerOptionActionClassic> =
  {
    type: TriggerOptionBase.type,
    text: TriggerOptionBase.text,
    required: TriggerOptionBase.required,
    properties: {
      text: TriggerOptionBase.properties?.text as any,
      method: TriggerOptionBase.properties?.using as any,
      using: {
        type: 'array',
        items: schemaRef<Types.RollableStatClassicID>('RollableStatClassicID')
      }
    }
  }
export const TriggerOptionProgressClassic: Schema<Types.TriggerOptionProgressClassic> =
  {
    type: TriggerOptionBase.type,
    text: TriggerOptionBase.text,
    required: TriggerOptionBase.required,
    properties: {
      text: TriggerOptionBase.properties?.text as any,
      method: TriggerOptionBase.properties?.using as any,
      using: {
        type: 'array',
        items: schemaRef<Progress.ProgressTypeClassic>('ProgressTypeClassic')
      }
    }
  }

export const RollableStatIDCommon: Schema<Types.RollableStatIDCommon> = {
  oneOf: [
    schemaRef<Players.StatID>('StatID'),
    schemaRef<Players.ConditionMeterID>('ConditionMeterID')
  ]
}

export const RollableStatStarforgedID: Schema<Types.RollableStatStarforgedID> =
  {
    oneOf: [
      schemaRef<Types.RollableStatIDCommon>('RollableStatIDCommon'),
      schemaRef<Assets.ConditionMeterAliasStarforged>(
        'ConditionMeterAliasStarforged'
      )
    ]
  }

export const RollableStatClassicID: Schema<Types.RollableStatClassicID> = {
  oneOf: [
    schemaRef<Types.RollableStatIDCommon>('RollableStatIDCommon'),
    schemaRef<Assets.ConditionMeterAliasClassic>('ConditionMeterAliasClassic')
  ]
}

const MoveBase: Schema<Types.Move> = {
  type: 'object',
  required: ['_id', 'text', 'name', 'trigger'],
  additionalProperties: false,
  properties: {
    _id: { $ref: '#/$defs/MoveID' },
    name: schemaRef<Localize.Label>('Label'),
    trigger: schemaRef<Types.Trigger>('Trigger') as any,
    attributes: {
      type: 'object',
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/$defs/CustomStat'
        }
      }
    },
    outcomes: schemaRef<Types.MoveOutcomes>('MoveOutcomes'),
    text: schemaRef<Localize.MarkdownParagraphs>('MarkdownParagraphs'),
    suggestions: schemaRef<Metadata.Suggestions>('Suggestions'),
    asset: {
      description: 'The ID of the parent Asset of the move, if any.',
      ...schemaRef<Assets.AssetID>('AssetID')
    },
    progress_move: {
      description:
        'Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.',
      type: 'boolean'
    },
    variant_of: {
      description: 'The ID of the move that this move is a variant of, if any.',
      ...schemaRef<Types.MoveID>('MoveID')
    },
    oracles: {
      description:
        'The ID of any oracles directly referenced by the move, or vice versa.',
      type: 'array',
      items: schemaRef<Oracles.OracleTableID>('OracleTableID')
    },
    optional: {
      description:
        'Whether or not the source material presents this rules item as optional.',
      default: false,
      type: 'boolean'
    },
    tags: {
      description:
        "Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.",
      type: 'array',
      items: {
        type: 'string'
      }
    },
    category: {
      ...schemaRef<Collections.MoveCategoryID>('MoveCategoryID'),
      description: "The ID of the move's category."
    },
    source: schemaRef<Metadata.Source>('Source')
  }
}

export const MoveOutcomeType: Schema<Types.MoveOutcomeType> = {
  type: 'string',
  enum: ['miss', 'weak_hit', 'strong_hit']
}

export const MoveOutcome: Schema<Types.MoveOutcome> = {
  type: 'object',
  required: ['text'],
  properties: {
    text: schemaRef<Localize.MarkdownParagraph>('MarkdownParagraph')
  }
}

export const MoveOutcomeMatchable: Schema<Types.MoveOutcomeMatchable> = {
  type: 'object',
  allOf: [
    schemaRef<Types.MoveOutcome>('MoveOutcome'),
    {
      properties: {
        match: schemaRef<Types.MoveOutcome>('MoveOutcome')
      }
    }
  ]
} as any

export const MoveOutcomes: Schema<Types.MoveOutcomes> = {
  type: 'object',
  required: MoveOutcomeType.enum,
  properties: {
    miss: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable'),
    weak_hit: schemaRef<Types.MoveOutcome>('MoveOutcome'),
    strong_hit: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable')
  }
}

export const MoveStarforged: Schema<Types.MoveStarforged> = _.merge(MoveBase, {
  properties: {
    trigger: schemaRef<Types.TriggerStarforged>('TriggerStarforged')
  }
}) as any

export const MoveClassic: Schema<Types.MoveClassic> = _.merge(MoveBase, {
  properties: { trigger: schemaRef<Types.TriggerClassic>('TriggerClassic') }
}) as any
