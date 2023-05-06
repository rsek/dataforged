import { type Static, Type, type TObject } from '@sinclair/typebox'
import { Localize, ID, Metadata, Inputs, Abstract } from 'schema/common'
import { Dictionary } from 'schema/common/abstract'
import * as Moves from 'schema/moves'

export const AssetConditionMeterControlField = Type.Intersect(
	[
		Inputs.CheckboxField,
		Type.Object({
			id: Type.Ref(ID.AssetConditionMeterControlFieldID)
		})
	],
	{ $id: '#/$defs/AssetConditionMeterControlField' }
)

export const AssetConditionMeter = Type.Composite(
	[
		Inputs.Meter,
		Type.Object({
			id: Type.Ref(ID.AssetConditionMeterID),
			controls: Type.Optional(
				Dictionary(Type.Ref(AssetConditionMeterControlField))
			)
		})
	],
	{ $id: '#/$defs/AssetConditionMeter' }
)

export const AssetConditionMeterExtension = Type.Partial(
	Type.Omit(AssetConditionMeter, ['label', 'value', 'id']),
	{ $id: '#/$defs/AssetConditionMeterExtension' }
)

export const AssetOptionField = Type.Intersect(
	[
		Type.Union([
			Inputs.TextField,
			Inputs.SelectFieldStat
			// TODO: selectFieldExtendAsset
		]),
		Type.Object({ id: Type.Ref(ID.AssetOptionFieldID) })
	],
	{
		$id: '#/$defs/AssetOptionField'
	}
)

export const AssetControlField = Type.Intersect(
	[
		Type.Union([
			Inputs.CheckboxField
			// TODO: selectFieldExtendAsset. for e.g. Ironclad
		]),
		Type.Object({ id: Type.Ref(ID.AssetControlFieldID) })
	],
	{ $id: '#/$defs/AssetControlField' }
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
	{ $id: '#/$defs/Asset' }
)

export type Asset = Static<typeof Asset>

export const AssetAbilityOptionField = Type.Intersect(
	[
		Type.Union([Inputs.TextField]),
		Type.Object({ id: Type.Ref(ID.AssetAbilityOptionFieldID) })
	],
	{ $id: '#/$defs/AssetAbilityOptionField' }
)
export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export const AssetAbilityControlField = Type.Intersect(
	[
		Type.Union([Inputs.ClockField, Inputs.CounterField, Inputs.CheckboxField]),
		Type.Object({ id: Type.Ref(ID.AssetAbilityControlFieldID) })
	],
	{ $id: '#/$defs/AssetAbilityControlField' }
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
	{ $id: '#/$defs/AssetAbility' }
)
export type AssetAbility = Static<typeof AssetAbility>

export const AssetType = Type.Composite(
	[
		Abstract.Collection(Type.Ref(Asset), Type.Ref(ID.AssetTypeID)),
		Type.Object({
			member_label: Type.Optional(Type.Ref(Localize.Label))
		})
	],
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>
