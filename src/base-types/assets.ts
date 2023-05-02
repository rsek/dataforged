import * as Types from '@base-types'
import { type Static, Type, TSchema } from '@sinclair/typebox'
import { Collection, DICT_KEY } from 'base-types/abstract'
import {
	AssetID,
	AssetAbilityControlFieldID,
	AssetAbilityID,
	AssetAbilityOptionFieldID,
	AssetConditionMeterID,
	AssetConditionMeterControlFieldID
} from 'base-types/id'
import { Label } from 'base-types/localize'

export type AssetConditionMeterControlField = AssetConditionMeterCheckbox

export type AssetOptionField =
	| Types.Inputs.TextField
	| Types.Inputs.SelectFieldStat
	| Types.Inputs.SelectFieldExtendAsset

export type AssetControlField =
	| Types.Inputs.CheckboxField
	| Types.Inputs.SelectFieldExtendAsset

export const AssetOptionField = Type.Composite([])

export const Asset = Type.Composite([
	Types.Abstract.SourcedNode,
	Type.Object({
		id: AssetID,
		name: Label,
		options: Type.Optional(Type.Record(DICT_KEY, AssetOptionField)),
		requirement: Type.Optional(Types.Localize.MarkdownString),
		abilities: Type.Tuple([AssetAbility, AssetAbility, AssetAbility]),
		controls: Type.Optional(Type.Record(DICT_KEY, AssetOptionField)),
		condition_meter: Type.Optional(AssetConditionMeter),
		count_as_impact: Type.Optional(Type.Boolean()),
		attachments: Type.Optional(AssetAttachment),
		shared: Type.Optional(Type.Boolean())
	})
])
export type Asset = Static<typeof Asset>

export interface AssetType extends Types.Abstract.Collection<Asset> {
	member_label?: string
}

export const AssetType = Collection(Asset)

export const AssetConditionMeter = Type.Composite([
	Types.Abstract.Meter,
	Type.Object({
		id: AssetConditionMeterID,
		controls: Type.Optional(
			Type.Record(DICT_KEY, AssetConditionMeterControlField)
		)
	})
])
export type AssetConditionMeter = Static<typeof AssetConditionMeter>

export const AssetConditionMeterCheckbox = Type.Composite([
	Types.Inputs.CheckboxField,
	{ id: AssetConditionMeterControlFieldID }
])

export type AssetConditionMeterCheckbox = Static<
	typeof AssetConditionMeterCheckbox
>

export const AssetConditionMeterExtension = Type.Partial(
	Type.Omit(AssetConditionMeter, ['label', 'value', 'id'])
)
export type AssetConditionMeterExtension = Static<
	typeof AssetConditionMeterExtension
>

export const AssetExtensionForeign = Type.Composite([
	Type.Omit(Asset, [
		'options',
		'abilities',
		'requirement',
		'shared',
		'controls',
		'condition_meter'
	]),
	Type.Object({ condition_meter: Type.Optional(AssetConditionMeterExtension) })
])
export type AssetExtensionForeign = Static<typeof AssetExtensionForeign>

export const AssetExtension = Type.Omit(AssetExtensionForeign, [
	'extends',
	'id',
	'abilities',
	'requirement'
])
export type AssetExtension = Static<typeof AssetExtension>

export type AssetAbilityOptionField = AssetOptionField & {
	id: AssetAbilityOptionFieldID
}
export type AssetAbilityControlField = (
	| Types.Inputs.ClockField
	| Types.Inputs.CounterField
	| Types.Inputs.CheckboxField
) & { id: AssetAbilityControlFieldID }

export const AssetAbility = Type.Object({
	id: AssetAbilityID,
	name: Type.Optional(Types.Localize.Label),
	text: Types.Localize.MarkdownString,
	enabled: Type.Boolean(),
	moves: Type.Optional(Type.Record(DICT_KEY, Types.Moves.Move)),
	options: Type.Optional(Type.Record(DICT_KEY, AssetAbilityOptionField)),
	controls: Type.Optional(Type.Record(DICT_KEY, AssetAbilityControlField)),
	extend_asset: Type.Optional(AssetExtension),
	extend_moves: Type.Optional(Type.Array(Types.Moves.Extension))
})
export type AssetAbility = Static<typeof AssetAbility>

export interface AssetAttachment {
	assets: Array<RegExp['source']>
	max?: number
}

// expected to be manipulated throughout the life of the asset
export interface ToggleField
	extends Types.Inputs.InputFieldBase,
		Types.Abstract.Select {
	field_type: 'toggle'
}

export interface ToggleFieldOption extends Types.Abstract.SelectOption {
	value: Types.Assets.AssetExtension
}
