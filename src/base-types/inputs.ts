import type * as Types from '@base-types'
import { type Simplify } from 'type-fest'

export type InputFieldID = string

export type InputFieldType =
	| 'text'
	| 'clock'
	| 'counter'
	| 'checkbox'
	| 'toggle'
	| ChoicesFieldType

export type ChoicesFieldType =
	| 'select_stat'
	| 'select_meter'
	| 'select_ref'
	| 'select_number'
	| 'select_asset_extension'

export interface InputFieldBase {
	id: InputFieldID
	label: Types.Localize.Label
	field_type: InputFieldType
}

export interface CheckboxField extends InputFieldBase {
	field_type: 'checkbox'
	value?: boolean
}

export interface NumberFieldBase extends InputFieldBase {
	field_type: 'clock' | 'counter'
	value?: number
	max: number | null
	min: number
}

export interface ClockField extends NumberFieldBase, Types.Abstract.Clock {
	field_type: 'clock'
	value?: number
	max: number
	min: number
}

export interface CounterField extends NumberFieldBase, Types.Abstract.Counter {
	field_type: 'counter'
	value?: number
	max: number | null
	min: number
}

export interface TextField extends InputFieldBase {
	field_type: 'text'
	value?: string | undefined
}

export interface SelectFieldBase<
	TField extends ChoicesFieldType = ChoicesFieldType,
	TChoice extends Types.Abstract.ChoiceBase = Types.Abstract.ChoiceBase
> extends InputFieldBase,
		Types.Abstract.ChoicesBase<TChoice> {
	field_type: TField
	value?: this['choices'][string]['value']
}

export interface SelectFieldChoiceBase<
	TValue extends number | string | object = number | string | object
> extends Types.Abstract.ChoiceBase<TValue> {
	// other
	selected?: boolean // default: false
}

export type SelectFieldStat = Simplify<
	SelectFieldBase<
		'select_stat',
		SelectFieldStatChoice<Types.Players.PlayerStat>
	>
>

export type SelectFieldStatChoice<
	T extends Types.Players.PlayerStatLike = Types.Players.PlayerStatLike
> = Simplify<SelectFieldChoiceBase<T>>

/** @alpha */
export type SelectFieldNumber = Simplify<
	SelectFieldBase<'select_number', SelectFieldNumberChoice>
>
/** @alpha */
export type SelectFieldNumberChoice = Simplify<SelectFieldChoiceBase<number>>

export type SelectFieldRef = Simplify<
	SelectFieldBase<'select_ref', SelectFieldRefChoice>
>
export type SelectFieldRefChoice = Simplify<
	SelectFieldChoiceBase<Types.Metadata.ID>
>

export type SelectFieldExtendAsset = Simplify<
	SelectFieldBase<'select_asset_extension', SelectFieldExtendAssetChoice>
>

export type SelectFieldExtendAssetChoice = Simplify<
	SelectFieldChoiceBase<Types.Assets.AssetExtension>
>
