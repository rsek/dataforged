import {
	type Static,
	Type,
	type TObject,
	type TString
} from '@sinclair/typebox'
import { startCase } from 'lodash'
import { Localize, ID, Metadata, Inputs, Abstract } from 'schema/common'
import { Dictionary } from 'schema/common/abstract'
import { Label } from 'schema/common/localize'
import { pascalCase } from 'schema/common/utils'
import * as Moves from 'schema/moves'

function AssetField<TFieldID extends TString, TFieldType extends TObject>(
	name: string,
	fieldDFID: TString,
	fieldTypes: TFieldType[]
) {
	return Type.Unsafe<
		Static<
			TFieldType & {
				id: TFieldID
			}
		>
	>({
		type: 'object',
		$id: `#/$defs/${pascalCase(name)}`,
		title: startCase(name),
		anyOf: fieldTypes.map((field) => Type.Ref(field)),
		properties: {
			id: Type.Ref(fieldDFID)
		}
	})
}

export const AssetConditionMeterControlField = AssetField(
	'AssetConditionMeterControlField',
	ID.AssetConditionMeterControlFieldID,
	[Inputs.CheckboxField]
)

export const AssetConditionMeter = Type.Object(
	{
		...Inputs.Meter.properties,
		id: Type.Ref(ID.AssetConditionMeterID),
		label: Type.Ref(Label),
		controls: Type.Optional(
			Dictionary(Type.Ref(AssetConditionMeterControlField))
		)
	},
	{ $id: '#/$defs/AssetConditionMeter', title: 'Asset condition meter' }
)

export const AssetConditionMeterExtension = Type.Partial(
	Type.Omit(AssetConditionMeter, ['label', 'value', 'id']),
	{ $id: '#/$defs/AssetConditionMeterExtension' }
)

export const AssetOptionField = AssetField(
	'AssetOptionField',
	ID.AssetOptionFieldID,
	[Inputs.SelectFieldStat, Inputs.TextField]
)

// TODO: selectFieldExtendAsset. for e.g. Ironclad
export const AssetControlField = AssetField(
	'AssetControlField',
	ID.AssetControlFieldID,
	[Inputs.CheckboxField]
)

function AssetExtendSelf<T extends TObject>(
	tAsset: T,
	omitKeys: Array<keyof Static<TObject>> = []
) {
	omitKeys = [
		...omitKeys,
		'requirement',
		'options',
		'controls' // most are just concerned with altering a condition meter or sth
	]
	if (omitKeys.includes('condition_meter'))
		return Abstract.NodeExtendSelf(tAsset as any, omitKeys)
	return Type.Intersect([
		Abstract.NodeExtendSelf(tAsset as any, [...omitKeys, 'condition_meter']),
		Type.Object({
			condition_meter: Type.Optional(Type.Ref(AssetConditionMeterExtension))
		})
	])
}

export const AssetAttachment = Type.Object(
	{
		assets: Type.Array(Type.Ref(ID.AssetIDWildcard), {
			description:
				'Asset IDs (which may be wildcards) that may be attached to this asset'
		}),
		max: Type.Optional(
			Type.Integer({
				minimum: 1,
				description:
					"Omit if there's no upper limit to the number of attached assets."
			})
		)
	},
	{
		$id: '#/$defs/AssetAttachment',
		description:
			"Describes which assets can be attached to this asset. Example: Starforged's Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info."
	}
)

export const Asset = Type.Object(
	{
		id: Type.Ref(ID.AssetID),
		name: Type.Ref(Localize.Label),
		source: Type.Ref(Metadata.Source),
		options: Type.Optional(Abstract.Dictionary(Type.Ref(AssetOptionField))),
		controls: Type.Optional(Abstract.Dictionary(Type.Ref(AssetControlField))),
		suggestions: Type.Optional(Type.Ref(Metadata.SuggestionsBase)),
		requirement: Type.Optional(Type.Ref(Localize.MarkdownString)),
		abilities: Type.Array(Type.Unsafe({ $ref: '#/$defs/AssetAbility' }), {
			minItems: 3,
			maxItems: 3
		}),
		condition_meter: Type.Optional(Type.Ref(AssetConditionMeter)),
		count_as_impact: Type.Optional(
			Type.Boolean({
				default: false,
				description:
					'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).'
			})
		),
		attachments: Type.Optional(Type.Ref(AssetAttachment)),
		shared: Type.Optional(
			Type.Boolean({
				description:
					"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too."
			})
		)
	},
	{ $id: '#/$defs/Asset', title: 'Asset' }
)

export type Asset = Static<typeof Asset>

export const AssetAbilityOptionField = AssetField(
	'AssetAbilityOptionField',
	ID.AssetAbilityOptionFieldID,
	[Inputs.TextField]
)

export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export const AssetAbilityControlField = AssetField(
	'AssetAbilityControlField',
	ID.AssetAbilityControlFieldID,
	[Inputs.ClockField, Inputs.CounterField, Inputs.CheckboxField]
)

export type AssetAbilityControlField = Static<typeof AssetAbilityControlField>

export const AssetAbility = Type.Object(
	{
		id: Type.Ref(ID.AssetAbilityID),
		name: Type.Optional(Type.Ref(Localize.Label)),
		text: Type.Ref(Localize.MarkdownString),
		enabled: Type.Boolean({ default: false }),
		moves: Type.Optional(
			Abstract.Dictionary(Type.Ref(Moves.Move), {
				description: 'Unique moves added by this asset ability.'
			})
		),
		options: Type.Optional(
			Abstract.Dictionary(Type.Ref(AssetAbilityOptionField))
		),
		controls: Type.Optional(
			Abstract.Dictionary(Type.Ref(AssetAbilityControlField))
		),
		extend_asset: Type.Optional(AssetExtendSelf(Asset as any, ['abilities'])),
		extend_moves: Type.Optional(Type.Array(Type.Ref(Moves.MoveExtension)))
	},
	{ $id: '#/$defs/AssetAbility', title: 'Asset ability' }
)
export type AssetAbility = Static<typeof AssetAbility>

export const AssetType = Abstract.Collection(
	Type.Ref(Asset),
	Type.Ref(ID.AssetTypeID),
	{
		member_label: Type.Optional(Type.Ref(Localize.Label))
	},
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>

export {
	CheckboxField,
	ClockField,
	CounterField,
	TextField,
	SelectFieldStat,
	SelectFieldRef
} from 'schema/common/inputs'
