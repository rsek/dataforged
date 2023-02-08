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

////
/// COMMON
////

export const MoveID: Schema<Types.MoveID> = {
  type: 'string',
  $comment: '{namespace}/moves/{moveCategory}/{move}',
  pattern: /^[a-z0-9][a-z0-9_]+\/moves(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const RollableStatIDCommon: Schema<Types.RollableStatIDCommon> = {
  oneOf: [
    schemaRef<Players.StatID>('StatID'),
    schemaRef<Players.ConditionMeterID>('ConditionMeterID')
  ]
}

const MoveBase: Schema<Types.Move> = {
  type: 'object',
  required: ['_id', 'text', 'name', 'trigger', 'source'],
  additionalProperties: false,
  properties: {
    _id: { $ref: '#/$defs/MoveID' },
    name: schemaRef<Localize.Label>('Label'),
    trigger: {} as any,
    source: schemaRef<Metadata.Source>('Source'),
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
    suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any,
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
    }
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
  required: MoveOutcomeType.enum as Types.MoveOutcomeType[],
  properties: {
    miss: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable'),
    weak_hit: schemaRef<Types.MoveOutcome>('MoveOutcome'),
    strong_hit: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable')
  }
}

export const CustomStat: Schema<any> = {} as any

export const TriggerBase: Schema<Types.TriggerBase<any>> = {
  required: ['text'],
  type: 'object',
  properties: {
    text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase') as any,
    options: schemaRef<Types.TriggerOption>('TriggerOption')
  }
} as any

export const TriggerOptionBase: Schema<Types.TriggerOptionBase<any>> = {
  type: 'object',
  required: ['roll_type', 'using'],
  properties: {
    text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase') as any,
    method: {
      title: 'RollSelectionMethod',
      type: 'string',
      oneOf: [
        { enum: ['any', 'highest', 'lowest', 'inherit', 'all'] },
        schemaRef<Types.MoveOutcomeType>('MoveOutcomeType')
      ],
      default: 'any'
    } as any,
    roll_type: {
      type: 'string',
      enum: ['action_roll', 'progress_roll']
    } as any,
    using: {
      type: 'array',
      items: { type: 'string' }
    }
  }
}

////
/// IRONSWORN CLASSIC
////

export const RollableStatClassicID: Schema<Types.RollableStatClassicID> = {
  oneOf: [
    schemaRef<Types.RollableStatIDCommon>('RollableStatIDCommon'),
    schemaRef<Assets.ConditionMeterAliasClassic>('ConditionMeterAliasClassic')
  ]
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
export const TriggerOptionActionClassic: Schema<Types.TriggerOptionActionClassic> =
  {
    type: 'object',
    allOf: [
      schemaRef<Types.TriggerOptionBase<any>>('TriggerOptionBase'),
      {
        properties: {
          using: {
            type: 'array',
            items: schemaRef<Types.RollableStatClassicID>(
              'RollableStatClassicID'
            )
          }
        }
      }
    ]
  } as any
export const TriggerOptionProgressClassic: Schema<Types.TriggerOptionProgressClassic> =
  {
    type: 'object',
    allOf: [
      schemaRef<Types.TriggerOptionBase<any>>('TriggerOptionBase'),
      {
        properties: {
          using: {
            type: 'array',
            items: schemaRef<Progress.ProgressTypeClassic>(
              'ProgressTypeClassic'
            )
          }
        }
      }
    ]
  } as any

export const MoveClassic: Schema<Types.MoveClassic> = _.merge({}, MoveBase, {
  properties: {
    trigger: schemaRef<Types.TriggerClassic>('TriggerClassic')
  }
}) as any

////
/// STARFORGED
////

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
export const TriggerOptionActionStarforged: Schema<Types.TriggerOptionActionStarforged> =
  {
    type: 'object',
    allOf: [
      schemaRef<Types.TriggerOptionBase<any>>('TriggerOptionBase'),
      {
        properties: {
          using: {
            type: 'array',
            items: schemaRef<Types.RollableStatStarforgedID>(
              'RollableStatStarforgedID'
            )
          }
        }
      }
    ]
  } as any
export const TriggerOptionProgressStarforged: Schema<Types.TriggerOptionProgressStarforged> =
  {
    type: 'object',
    allOf: [
      schemaRef<Types.TriggerOptionBase<any>>('TriggerOptionBase'),
      {
        properties: {
          using: {
            type: 'array',
            items: schemaRef<Progress.ProgressTypeStarforged>(
              'ProgressTypeStarforged'
            )
          }
        }
      }
    ]
  } as any
export const RollableStatStarforgedID: Schema<Types.RollableStatStarforgedID> =
  {
    oneOf: [
      schemaRef<Types.RollableStatIDCommon>('RollableStatIDCommon'),
      schemaRef<Assets.ConditionMeterAliasStarforged>(
        'ConditionMeterAliasStarforged'
      )
    ]
  }

export const MoveStarforged: Schema<Types.MoveStarforged> = _.merge(
  {},
  MoveBase,
  {
    properties: {
      trigger: schemaRef<Types.TriggerStarforged>('TriggerStarforged')
    }
  }
) as any
