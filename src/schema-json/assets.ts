import { type JSONSchemaType as Schema } from 'ajv'
import type * as Types from '@base-types'
import { DF_KEY, dictionarySchema, refSchema } from './common'
import { Abstract } from '@schema-json'
import _ from 'lodash'

export const AssetID: Schema<Types.Assets.AssetID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const AssetOptionFieldID: Schema<Types.Assets.AssetOptionFieldID> = {
	type: 'string',
	pattern:
		/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/options\/[a-z][a-z_]*[a-z]$/
			.source
}
export const AssetControlFieldID: Schema<Types.Assets.AssetControlFieldID> = {
	type: 'string',
	pattern:
		/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/controls\/[a-z][a-z_]*[a-z]$/
			.source
}

const AssetOptionField: Schema<Types.Assets.AssetOptionField> = {
	title: 'Asset option field',
	type: 'object',
	properties: {
		_id: refSchema<Types.Assets.AssetOptionFieldID>('AssetOptionFieldID')
	},
	oneOf: [
		refSchema<Types.Inputs.TextField>('TextField'),
		refSchema<Types.Inputs.ChoicesField>('ChoicesField')
	]
}

const AssetControlField: Schema<Types.Assets.AssetControlField> = {
	title: 'Asset control field',
	type: 'object',
	properties: {
		_id: refSchema<Types.Assets.AssetControlFieldID>('AssetControlFieldID')
	},
	oneOf: [
		refSchema<Types.Inputs.CheckboxField>('CheckboxField'),
		refSchema<Types.Inputs.ConditionMeterField>('ConditionMeterField'),
		refSchema<Types.Assets.ToggleField>('ToggleField')
	]
}

export const Asset: Omit<Schema<Types.Assets.Asset>, 'anyOf'> = {
	type: 'object',
	required: ['_id', 'name', 'source', 'abilities'],
	additionalProperties: false,
	properties: {
		_id: refSchema<Types.Assets.AssetID>('AssetID'),
		shared: {
			description:
				"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.",
			type: 'boolean',
			nullable: undefined as any
		},
		name: refSchema<Types.Localize.Label>('Label'),
		options: dictionarySchema<Types.Assets.AssetOptionField>(AssetOptionField),
		controls:
			dictionarySchema<Types.Assets.AssetControlField>(AssetControlField),
		requirement: refSchema<Types.Localize.MarkdownPhrase>('MarkdownPhrase'),
		abilities: {
			type: 'array',
			minItems: 3,
			maxItems: 3,
			items: refSchema<Types.Assets.AssetAbility>('AssetAbility')
		},
		count_as_impact: {
			description:
				'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).',
			type: 'boolean',
			default: false,
			nullable: undefined as any
		},
		source: refSchema<Types.Metadata.Source>('Source'),
		attachments: refSchema<Types.Assets.AssetAttachment>('AssetAttachment')
	}
}

export const AssetAttachment: Schema<Types.Assets.AssetAttachment> = {
	description:
		'Describes which assets can be attached to this asset. The "canonical" example for this are Starforged\'s Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.',
	type: 'object',
	required: ['patterns', 'max'],
	properties: {
		max: {
			title: 'Maximum attached assets',
			description:
				"If there's no upper limit to the number of attached assets, this is `null`.",
			type: ['integer', 'null'] as any,
			minimum: 1,
			default: null
		},
		patterns: {
			title: 'Attached asset ID patterns',
			description:
				'Regular expressions matching the IDs of assets that can be attached to this asset.',
			type: 'array',
			items: {
				type: 'string',
				format: 'regex',
				examples: [
					/^[a-z0-9][a-z0-9_]+\/assets\/module\/[a-z][a-z_]*[a-z]$/.source
				]
			}
		}
	}
}

export const AssetAbilityID: Schema<Types.Assets.AssetAbilityID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/[0-2]$/.source
}

export const AssetAbilityOptionFieldID: Schema<Types.Assets.AssetAbilityOptionFieldID> =
	{
		type: 'string',
		pattern:
			/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/[0-2]\/options\/[a-z][a-z_]*[a-z]$/
				.source
	}
const AssetAbilityOptionField: Schema<Types.Assets.AssetAbilityOptionField> = {
	type: 'object',
	allOf: [
		refSchema<Types.Inputs.TextField>('TextField'),
		{
			properties: {
				_id: refSchema<Types.Assets.AssetAbilityOptionFieldID>(
					'AssetAbilityOptionFieldID'
				)
			}
		}
	]
} as any

export const AssetAbilityControlFieldID: Schema<Types.Assets.AssetAbilityControlFieldID> =
	{
		type: 'string',
		pattern:
			/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/abilities\/[0-2]\/controls\/[a-z][a-z_]*[a-z]$/
				.source
	}

export const AssetAbility: Schema<Types.Assets.AssetAbility> = {
	type: 'object',
	required: ['_id', 'text'],
	additionalProperties: false,
	properties: {
		_id: refSchema<Types.Assets.AssetAbilityID>('AssetAbilityID'),
		name: refSchema<Types.Localize.Label>('Label'),
		text: refSchema<Types.Localize.MarkdownParagraph>('MarkdownParagraph'),
		enabled: { type: 'boolean', default: false, nullable: undefined as any },
		controls: {
			type: 'object',
			required: undefined as any,
			nullable: undefined as any,
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: {
					oneOf: [
						refSchema<Types.Inputs.TextField>('TextField'),
						refSchema<Types.Inputs.CounterField>('CounterField'),
						refSchema<Types.Inputs.ClockField>('ClockField'),
						refSchema<Types.Inputs.CheckboxField>('CheckboxField')
					]
				}
			}
		},
		options: dictionarySchema<Types.Assets.AssetAbilityOptionField>(
			AssetAbilityOptionField
		),
		extend_asset: refSchema<Types.Assets.AssetExtension>('AssetExtension'),
		extend_moves: {
			type: 'array',
			nullable: undefined as any,
			items: refSchema<Types.Moves.MoveExtension>('MoveExtension')
		},
		moves: {
			description: 'Unique moves added by this asset ability.',
			type: 'object',
			additionalProperties: false,
			required: undefined as any,
			nullable: undefined as any,
			patternProperties: {
				[DF_KEY]: refSchema<Types.Moves.Move>('Move')
			}
		}
	}
}

export const AssetTypeID: Schema<Types.Assets.AssetTypeID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/collections\/assets(\/[a-z][a-z_]*[a-z]){1}$/
		.source,
	examples: [
		'starforged/collections/assets/command_vehicle',
		'ironsworn/collections/assets/companion'
	]
}

export const AssetType: Schema<Types.Assets.AssetType> =
	Abstract.collectionSchema<Types.Assets.AssetType>('Asset', 'AssetTypeID')

export const AssetTypeExtension = Abstract.collectionExtensionSchema(
	'Asset',
	'AssetTypeID'
)

const ToggleFieldOption: Schema<Types.Assets.ToggleFieldOption> = {
	title: 'Toggle field option',
	type: 'object',
	required: ['label', 'value'],
	properties: {
		label: refSchema<Types.Localize.Label>('Label'),
		value: refSchema<Types.Assets.AssetExtension>('AssetExtension')
	}
}

export const ToggleField: Schema<Types.Assets.ToggleField> = {
	type: 'object',
	required: ['_id', 'label', 'field_type', 'choices'],
	properties: {
		_id: { type: 'string' },
		field_type: { type: 'string', const: 'toggle' },
		label: refSchema<Types.Localize.Label>('Label'),
		choices: dictionarySchema<Types.Assets.ToggleFieldOption>(ToggleFieldOption)
	}
}

// export const AssetAbilityExtension: Schema<Types.Assets.AssetAbilityExtension> =
// 	{
// 		type: 'object',
// 		required: ['_extends'],
// 		properties: {
// 			_extends: {
// 				type: ['null', 'array'],
// 				items: refSchema<Types.Assets.AssetAbilityID>('AssetAbilityID')
// 			},
//       controls: {},
//       text: {}
// 		}
// 	}

export const AssetExtension: Schema<Types.Assets.AssetExtension> = {
	type: 'object',
	properties: _(Asset.properties)
		.pick('controls', 'count_as_impact', 'attachments', 'shared')
		.omit(`controls.patternProperties.${DF_KEY}.required`)
		.value()
}
