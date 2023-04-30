import { type JSONSchemaType as Schema } from 'ajv'
import type * as Types from '@base-types'
import { dictionarySchema, refSchema } from './common'
import { Abstract } from '@schema-json'
import _ from 'lodash'
import { type Simplify } from 'type-fest'

export const AssetID: Schema<Types.Assets.AssetID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}$/.source
}

export const AssetIDWildcard: Schema<Types.Assets.AssetIDWildcard> = {
	type: 'string',
	pattern: /^([a-z_]+|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)$/.source
}

export const AssetConditionMeterID: Schema<Types.Assets.AssetConditionMeterID> =
	{
		type: 'string',
		pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter$/.source
	}

export const AssetConditionMeterIDWildcard: Schema<Types.Assets.AssetConditionMeterIDWildcard> =
	{
		type: 'string',
		pattern:
			/^([a-z_]+|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/condition_meter$/
				.source
	}

export const AssetConditionMeterControlFieldID: Schema<Types.Assets.AssetConditionMeterControlFieldID> =
	{
		type: 'string',
		pattern:
			/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter\/controls\/[a-z_]+$/
				.source
	}

export const AssetOptionFieldID: Schema<Types.Assets.AssetOptionFieldID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/options\/[a-z_]+$/.source
}

export const AssetOptionFieldIDWildcard: Schema<Types.Assets.AssetOptionFieldIDWildcard> =
	{
		type: 'string',
		pattern:
			/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/options\/[a-z_]+$/
				.source
	}

export const AssetControlFieldID: Schema<Types.Assets.AssetControlFieldID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/controls\/[a-z_]+$/.source
}

export const AssetControlFieldIDWildcard: Schema<Types.Assets.AssetControlFieldIDWildcard> =
	{
		type: 'string',
		pattern:
			/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/controls\/[a-z_]+$/
				.source
	}

export const AssetOptionField: Schema<Types.Assets.AssetOptionField> = {
	title: 'Asset option field',
	type: 'object',
	required: ['id'],
	properties: {
		id: refSchema<Types.Assets.AssetOptionFieldID>('AssetOptionFieldID')
	},
	oneOf: [
		refSchema<Types.Inputs.TextField>('TextField'),
		refSchema<Types.Inputs.SelectFieldStat>('SelectFieldStat')
	]
}

export const AssetControlField: Schema<Types.Assets.AssetControlField> = {
	title: 'Asset control field',
	type: 'object',
	required: ['id'],
	properties: {
		id: refSchema<Types.Assets.AssetControlFieldID>('AssetControlFieldID')
	},
	oneOf: [
		refSchema<Types.Inputs.CheckboxField>('CheckboxField'),
		refSchema<Types.Inputs.SelectFieldExtendAsset>('SelectFieldExtendAsset')
	]
}

export const Asset: Simplify<Schema<Types.Assets.Asset>> = {
	type: 'object',
	required: ['id', 'name', 'source', 'abilities'],
	additionalProperties: false,
	properties: {
		id: refSchema<Types.Assets.AssetID>('AssetID'),
		shared: {
			description:
				"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.",
			type: 'boolean',
			nullable: true
		},
		name: refSchema<Types.Localize.Label>('Label'),
		options: {
			...dictionarySchema<Types.Assets.AssetOptionField>(
				refSchema<Types.Assets.AssetOptionField>('AssetOptionField')
			),
			nullable: true
		},
		controls: {
			...dictionarySchema<Types.Assets.AssetControlField>(
				refSchema<Types.Assets.AssetControlField>('AssetControlField')
			),
			nullable: true
		},
		requirement: refSchema<Types.Localize.MarkdownString>('MarkdownString'),
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
			nullable: true
		},
		source: refSchema<Types.Metadata.Source>('Source'),
		attachments: refSchema<Types.Assets.AssetAttachment>('AssetAttachment'),
		condition_meter: {
			...refSchema<Types.Assets.AssetConditionMeter>('AssetConditionMeter'),
			nullable: true
		}
	}
}

export const AssetAttachment: Schema<Types.Assets.AssetAttachment> = {
	description:
		'Describes which assets can be attached to this asset. The "canonical" example for this are Starforged\'s Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.',
	type: 'object',
	required: ['assets'],
	properties: {
		max: {
			title: 'Maximum attached assets',
			description:
				"Omitted if there's no upper limit to the number of attached assets.",
			type: 'integer',
			minimum: 1,
			nullable: true
		},
		assets: {
			title: 'Attachable assets',
			description:
				'Asset IDs (which may be wildcards) that may be attached to this asset',
			type: 'array',
			items: refSchema<string>('AssetIDWildcard')
		}
	}
}

export const AssetAbilityID: Schema<Types.Assets.AssetAbilityID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/[0-2]$/.source
}

export const AssetAbilityOptionFieldID: Schema<Types.Assets.AssetAbilityOptionFieldID> =
	{
		type: 'string',
		pattern: /^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/[0-2]\/options\/[a-z_]+$/
			.source
	}
export const AssetAbilityOptionField: Schema<Types.Assets.AssetAbilityOptionField> =
	{
		type: 'object',
		properties: {
			id: refSchema<Types.Assets.AssetAbilityOptionFieldID>(
				'AssetAbilityOptionFieldID'
			)
		},
		oneOf: [
			refSchema<Types.Inputs.TextField>('TextField'),
			refSchema<Types.Inputs.CheckboxField>('CheckboxField')
		]
	} as any

export const AssetAbilityControlFieldID: Schema<Types.Assets.AssetAbilityControlFieldID> =
	{
		type: 'string',
		pattern:
			/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/abilities\/[0-2]\/controls\/[a-z_]+$/
				.source
	}

export const AssetAbilityControlField = {
	type: 'object',
	properties: {
		id: refSchema<string>('AssetAbilityControlFieldID')
	},
	oneOf: [
		refSchema<Types.Inputs.TextField>('TextField'),
		refSchema<Types.Inputs.CounterField>('CounterField'),
		refSchema<Types.Inputs.ClockField>('ClockField'),
		refSchema<Types.Inputs.CheckboxField>('CheckboxField')
	]
}

export const AssetAbility: Schema<Types.Assets.AssetAbility> = {
	type: 'object',
	required: ['id', 'text'],
	additionalProperties: false,
	properties: {
		id: refSchema<Types.Assets.AssetAbilityID>('AssetAbilityID'),
		name: {
			...refSchema<Types.Localize.Label>('Label'),
			type: 'string',
			nullable: true
		},
		text: refSchema<Types.Localize.MarkdownString>('MarkdownString'),
		enabled: { type: 'boolean', default: false },
		controls: {
			...dictionarySchema<Types.Assets.AssetAbilityControlField>(
				refSchema('AssetAbilityControlField')
			),
			nullable: true
		},
		options: {
			...dictionarySchema<Types.Assets.AssetAbilityOptionField>(
				refSchema('AssetAbilityOptionField')
			),
			nullable: true
		},
		extend_asset: refSchema<Types.Assets.AssetExtension>('AssetExtension'),
		extend_moves: {
			type: 'array',
			nullable: undefined as any,
			items: refSchema<Types.Moves.MoveExtension>('MoveExtension')
		},
		moves: {
			...dictionarySchema(refSchema<Types.Moves.Move>('Move'), {
				description: 'Unique moves added by this asset ability.'
			}),
			nullable: true
		}
	}
}

export const AssetTypeID: Schema<Types.Assets.AssetTypeID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/collections\/assets(\/[a-z_]+){1}$/.source,
	examples: [
		'starforged/collections/assets/command_vehicle',
		'classic/collections/assets/companion'
	]
}

export const AssetType: Schema<Types.Assets.AssetType> = _.set(
	Abstract.collectionSchema<Types.Assets.AssetType>('Asset', 'AssetTypeID'),
	'properties.member_label',
	refSchema<string>('Label')
)

// const ToggleFieldOption: Schema<Types.Assets.ToggleFieldOption> = {
// 	title: 'Toggle field option',
// 	type: 'object',
// 	required: ['id', 'label', 'value'],
// 	properties: {
// 		id: { type: 'string' },
// 		label: refSchema<Types.Localize.Label>('Label'),
// 		value: refSchema<Types.Assets.AssetExtension>('AssetExtension')
// 	}
// }

export const AssetConditionMeter: Schema<Types.Assets.AssetConditionMeter> = {
	type: 'object',
	required: ['id', 'label', 'min', 'max'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		value: { type: 'integer', nullable: true },
		min: { type: 'integer', default: 0 },
		max: { type: 'integer' },
		controls: {
			...dictionarySchema(refSchema('AssetConditionMeterControlField')),
			nullable: true
		}
	}
}

export const AssetConditionMeterControlField: Schema<Types.Assets.AssetConditionMeterControlField> =
	{
		type: 'object',
		required: ['id', 'field_type', 'label'],
		additionalProperties: false,
		properties: {
			id: refSchema<string>('AssetConditionMeterControlFieldID'),
			field_type: { const: 'checkbox', type: 'string' },
			label: refSchema<string>('Label'),
			value: { type: 'boolean', default: false, nullable: true }
		}
	}

// const ToggleField: Schema<Types.Assets.ToggleField> = {
// 	type: 'object',
// 	required: ['id', 'label', 'field_type', 'choices'],
// 	properties: {
// 		id: { type: 'string' },
// 		field_type: { type: 'string', const: 'toggle' },
// 		label: refSchema<Types.Localize.Label>('Label'),
// 		choices: dictionarySchema<Types.Assets.ToggleFieldOption>(ToggleFieldOption)
// 	}
// }

// export const AssetAbilityExtension: Schema<Types.Assets.AssetAbilityExtension> =
// 	{
// 		type: 'object',
// 		required: ['extends'],
// 		properties: {
// 			extends: {
// 				type: ['null', 'array'],
// 				items: refSchema<Types.Assets.AssetAbilityID>('AssetAbilityID')
// 			},
//       controls: {},
//       text: {}
// 		}
// 	}

export const AssetExtension: Schema<Types.Assets.AssetExtension> = _(Asset)
	.pick(
		'type',
		'additionalProperties',
		'properties.attachments',
		'properties.count_as_impact'
	)
	.omit('properties.attachments.required')
	.set(
		'properties.condition_meter',
		refSchema<Types.Assets.AssetConditionMeterExtension>(
			'AssetConditionMeterExtension'
		)
	)
	.value()

export const AssetConditionMeterExtension: Schema<Types.Assets.AssetConditionMeterExtension> =
	_(AssetConditionMeter)
		.pick('type', 'properties.min', 'properties.max', 'properties.controls')
		.value()
