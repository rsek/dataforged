import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'
import {
	UnionCheckboxField,
	UnionAssetExtensionChoicesField,
	UnionClockField,
	UnionCounterField,
	UnionNumberChoicesField,
	UnionStatIDChoicesField,
	UnionTextField
} from 'json-typedef/inputs'

export const Asset: JTDSchemaType<
	Types.Assets.Asset,
	{
		AssetAbility: Types.Assets.AssetAbility
		ID: string
		Label: string
		Source: Types.Metadata.Source
		MarkdownString: string
		AssetControlField: Types.Assets.AssetControlField
		AssetOptionField: Types.Assets.AssetOptionField
		AssetAttachment: Types.Assets.AssetAttachment
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		abilities: { elements: { ref: 'AssetAbility' } }
	},
	optionalProperties: {
		requirement: { ref: 'MarkdownString' },
		count_as_impact: { type: 'boolean' },
		controls: { values: { ref: 'AssetControlField' } },
		attachments: { ref: 'AssetAttachment' },
		options: { values: { ref: 'AssetOptionField' } },
		shared: { type: 'boolean' }
	}
}

export const AssetAbility: JTDSchemaType<
	Types.Assets.AssetAbility,
	{
		ID: string
		MarkdownString: string
		Label: string
		AssetAbilityControlField: Types.Assets.AssetAbilityControlField
		AssetOptionField: Types.Assets.AssetOptionField
		Move: Types.Moves.Move
		MoveExtension: Types.Moves.MoveExtension
		AssetExtension: Types.Assets.AssetExtension
	}
> = {
	properties: {
		id: { ref: 'ID' },
		text: { ref: 'MarkdownString' },
		enabled: { type: 'boolean' }
	},
	optionalProperties: {
		name: { ref: 'Label' },
		controls: { values: { ref: 'AssetAbilityControlField' } },
		options: { values: { ref: 'AssetOptionField' } },
		moves: { values: { ref: 'Move' } },
		extend_asset: { ref: 'AssetExtension' },
		extend_moves: { elements: { ref: 'MoveExtension' } }
	}
}

export const AssetAbilityControlField: JTDSchemaType<
	Types.Assets.AssetAbilityControlField,
	{ ID: string; Label: string }
> = {
	discriminator: 'field_type',
	mapping: {
		checkbox: UnionCheckboxField,
		clock: UnionClockField,
		counter: UnionCounterField
	}
}

export const AssetOptionField: JTDSchemaType<
	Types.Assets.AssetOptionField,
	{
		ID: string
		Label: string
		AssetExtension: Types.Assets.AssetExtension
		StatID: string
	}
> = {
	metadata: {
		description:
			'Asset options are fields that are usually only set once, typically when the player purchases the asset. The most common examples are the "Name" fields on companion assets. A more complex example is the choice of stats on the Devotant asset.'
	},
	discriminator: 'field_type',
	mapping: {
		// @ts-expect-error computers were a mistake
		text: UnionTextField,
		// @ts-expect-error
		choices_stat_id: UnionStatIDChoicesField,
		// @ts-expect-error
		choices_number: UnionNumberChoicesField,
		// @ts-expect-error
		choices_extend_asset: UnionAssetExtensionChoicesField
	}
}

export const AssetControlField: JTDSchemaType<
	Types.Assets.AssetControlField,
	{ ID: string; Label: string }
> = {
	discriminator: 'field_type',
	metadata: {
		description:
			"Asset controls are fields that are expected to change throughout the asset's lifespan. The most common example are the condition meters on certain assets. A more complex example is the distinct mechanical modes on Ironsworn's 'Armored'."
	},
	mapping: {
		condition_meter: UnionClockField,
		checkbox: UnionCheckboxField,
		// @ts-expect-error oh come ON. it can't be missing field_type, it's the discriminator!!!
		choices_extend_asset: UnionAssetExtensionChoicesField
	}
}
