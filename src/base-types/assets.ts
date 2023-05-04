import * as Types from '@base-types'
import { type Static, Type, type TObject } from '@sinclair/typebox'
import * as ID from 'base-types/id'
import { Label } from 'base-types/localize'
import { MoveExtension } from 'base-types/moves'
import {
	Collection,
	Dictionary,
	NodeExtendSelf,
	SuggestionsBase
} from 'base-types/common'

export const AssetConditionMeter = Type.Composite(
	[
		Types.Common.Meter,
		Type.Object({
			id: Type.Ref(ID.AssetConditionMeterID),
			controls: Type.Optional(
				Dictionary(
					Type.Intersect(
						[
							Types.Inputs.CheckboxField,
							Type.Object({ id: ID.AssetConditionMeterControlFieldID })
						],
						{ $id: '#/$defs/AssetConditionMeterControlField' }
					)
				)
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
			Types.Inputs.TextField,
			Types.Inputs.SelectFieldStat
			// TODO: selectFieldExtendAsset
		]),
		Type.Object({ id: ID.AssetOptionFieldID })
	],
	{
		$id: '#/$defs/AssetOptionField'
	}
)

export const AssetControlField = Type.Intersect(
	[
		Type.Union([
			Types.Inputs.CheckboxField
			// TODO: selectFieldExtendAsset. for e.g. Ironclad
		]),
		Type.Object({ id: ID.AssetControlFieldID })
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
		return NodeExtendSelf(tAsset as any, omitKeys)
	return Type.Intersect([
		NodeExtendSelf(tAsset as any, [...omitKeys, 'condition_meter']),
		Type.Object({
			condition_meter: Type.Optional(AssetConditionMeterExtension)
		})
	])
}

export const AssetAttachment = Type.Object(
	{
		assets: Type.Array(ID.AssetIDWildcard, {
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

export const Asset = Type.Recursive((tAsset) =>
	Type.Object(
		{
			id: Type.Ref(ID.AssetID),
			name: Type.Ref(Label),
			source: Type.Ref(Types.Metadata.Source),
			options: Type.Optional(Dictionary(AssetOptionField)),
			controls: Type.Optional(Dictionary(AssetControlField)),
			suggestions: Type.Optional(Type.Ref(SuggestionsBase)),
			requirement: Type.Optional(Type.Ref(Types.Localize.MarkdownString)),
			abilities: Type.Array(
				Type.Ref(Type.Unsafe({ $id: '#/$defs/AssetAbility' })),
				{
					minItems: 3,
					maxItems: 3
				}
			),
			condition_meter: Type.Optional(AssetConditionMeter),
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
)
export type Asset = Static<typeof Asset>

export const AssetAbilityOptionField = Type.Intersect([
	Type.Union([Types.Inputs.TextField]),
	Type.Object(
		{ id: ID.AssetAbilityOptionFieldID },
		{ $id: '#/$defs/AssetAbilityOptionField' }
	)
])
export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export const AssetAbilityControlField = Type.Intersect(
	[
		Type.Union([
			Types.Inputs.ClockField,
			Types.Inputs.CounterField,
			Types.Inputs.CheckboxField
		]),
		Type.Object({ id: ID.AssetAbilityControlFieldID })
	],
	{ $id: '#/$defs/AssetAbilityControlField' }
)
export type AssetAbilityControlField = Static<typeof AssetAbilityControlField>

export const AssetAbility = Type.Object(
	{
		id: Type.Ref(ID.AssetAbilityID),
		name: Type.Optional(Type.Ref(Types.Localize.Label)),
		text: Type.Ref(Types.Localize.MarkdownString),
		enabled: Type.Boolean({ default: false }),
		moves: Type.Optional(
			Dictionary(Types.Moves.Move, {
				description: 'Unique moves added by this asset ability.'
			})
		),
		options: Type.Optional(Dictionary(Type.Ref(AssetAbilityOptionField))),
		controls: Type.Optional(Dictionary(Type.Ref(AssetAbilityControlField))),
		extend_asset: Type.Optional(AssetExtendSelf(Asset as any, ['abilities'])),
		extend_moves: Type.Optional(Type.Array(Type.Ref(MoveExtension)))
	},
	{ $id: '#/$defs/AssetAbility' }
)
export type AssetAbility = Static<typeof AssetAbility>

export const AssetType = Type.Composite(
	[
		Collection(Asset as any, ID.AssetTypeID),
		Type.Object({
			member_label: Type.Optional(Type.Ref(Label))
		})
	],
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>
