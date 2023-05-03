import * as Types from '@base-types'
import { type Static, Type, type TObject } from '@sinclair/typebox'
import { Collection } from 'base-types/abstract'
import {
	AssetID,
	AssetAbilityControlFieldID,
	AssetAbilityID,
	AssetAbilityOptionFieldID,
	AssetConditionMeterID,
	AssetConditionMeterControlFieldID,
	AssetControlFieldID,
	AssetOptionFieldID,
	AssetIDWildcard,
	AssetTypeID
} from 'base-types/id'
import { Label } from 'base-types/localize'
import { Dictionary, NodeExtendForeign, NodeExtendSelf } from 'base-types/utils'

const AssetConditionMeterControlField = Type.Intersect(
	[
		Types.Inputs.CheckboxField,
		Type.Object({ id: AssetConditionMeterControlFieldID })
	],
	{ $id: 'AssetConditionMeterControlField' }
)

const AssetConditionMeter = Type.Composite(
	[
		Types.Abstract.Meter,
		Type.Object({
			id: AssetConditionMeterID,
			controls: Type.Optional(Dictionary(AssetConditionMeterControlField))
		})
	],
	{ $id: 'AssetConditionMeter' }
)

const AssetConditionMeterExtension = Type.Partial(
	Type.Omit(AssetConditionMeter, ['label', 'value', 'id']),
	{ $id: 'AssetConditionMeterExtension' }
)

const AssetOptionField = Type.Intersect(
	[
		Type.Union([
			Types.Inputs.TextField,
			Types.Inputs.SelectFieldStat
			// TODO: selectFieldExtendAsset
		]),
		Type.Object({ id: AssetOptionFieldID })
	],
	{
		$id: 'AssetOptionField'
	}
)

const AssetControlField = Type.Intersect(
	[
		Type.Union([
			Types.Inputs.CheckboxField
			// TODO: selectFieldExtendAsset. for e.g. Ironclad
		]),
		Type.Object({ id: AssetControlFieldID })
	],
	{ $id: 'AssetControlField' }
)

export const AssetExtendSelf = <T extends TObject>(
	tAsset: T,
	omitKeys: Array<keyof Static<TObject>> = []
) => {
	omitKeys = [
		...omitKeys,
		'requirement',
		'options', // generally not changed after instantiating. exception - augmented?
		'controls' // most are just concerned with altering a condition meter or sth
	]
	if (omitKeys.includes('condition_meter'))
		return NodeExtendSelf(tAsset as any, omitKeys)
	return Type.Intersect([
		NodeExtendSelf(tAsset as any, [...omitKeys, 'condition_meter']),
		Type.Object({
			condition_meter: Type.Optional(AssetConditionMeterExtension)
		})
	])
}

const AssetAttachments = Type.Object(
	{
		assets: Type.Array(AssetIDWildcard),
		max: Type.Optional(Type.Integer({ minimum: 1 }))
	},
	{ $id: 'AssetAttachments' }
)

export const Asset = Type.Recursive((tAsset) =>
	Type.Object(
		{
			id: AssetID,
			name: Label,
			source: Types.Metadata.Source,
			options: Type.Optional(Dictionary(AssetOptionField)),
			controls: Type.Optional(Dictionary(AssetControlField)),
			suggestions: Type.Optional(Types.Metadata.SuggestionsBase),
			requirement: Type.Optional(Types.Localize.MarkdownString),
			abilities: Type.Array(AssetAbility(tAsset as any), {
				minItems: 3,
				maxItems: 3
			}),
			condition_meter: Type.Optional(AssetConditionMeter),
			count_as_impact: Type.Optional(Type.Boolean({ default: false })),
			attachments: Type.Optional(AssetAttachments),
			shared: Type.Optional(Type.Boolean())
		},
		{ $id: 'Asset' }
	)
)
export type Asset = Static<typeof Asset>

export const AssetType = Type.Composite(
	[
		Collection(Asset as any, AssetTypeID),
		Type.Object({
			member_label: Type.Optional(Label)
		})
	],
	{ $id: 'AssetType' }
)
export type AssetType = Static<typeof AssetType>

const AssetAbilityControlField = Type.Intersect(
	[
		Type.Union([
			Types.Inputs.ClockField,
			Types.Inputs.CounterField,
			Types.Inputs.CheckboxField
		]),
		Type.Object({ id: AssetAbilityControlFieldID })
	],
	{ $id: 'AssetAbilityControlField' }
)

const AssetAbilityOptionField = Type.Intersect([
	Type.Union([Types.Inputs.TextField]),
	Type.Object(
		{ id: AssetAbilityOptionFieldID },
		{ $id: 'AssetAbilityOptionField' }
	)
])
const AssetAbility = <T extends TObject>(tAsset: T) =>
	Type.Object(
		{
			id: AssetAbilityID,
			name: Type.Optional(Types.Localize.Label),
			text: Types.Localize.MarkdownString,
			enabled: Type.Boolean(),
			moves: Type.Optional(Dictionary(Types.Moves.Move)),
			options: Type.Optional(Dictionary(AssetAbilityOptionField)),
			controls: Type.Optional(Dictionary(AssetAbilityControlField)),
			extend_asset: Type.Optional(
				AssetExtendSelf(tAsset as any, ['abilities'])
			),
			extend_moves: Type.Optional(
				Type.Array(NodeExtendForeign(Types.Moves.Move))
			)
		},
		{ $id: 'AssetAbility' }
	)
export type AssetAbility = Static<ReturnType<typeof AssetAbility>>
