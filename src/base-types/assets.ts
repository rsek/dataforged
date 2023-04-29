import type * as Types from '@base-types'
import { type InputFieldBase } from 'base-types/inputs'
import { type PartialDeep, type Simplify } from 'type-fest'

export type AssetID = string
export type AssetIDWildcard = string

export type AssetTypeID = string

export interface AssetType extends Types.Abstract.Collection<Asset> {
	member_label?: string
}

export type AssetOptionFieldID = string
export type AssetOptionFieldIDWildcard = string

export type AssetControlFieldID = string
export type AssetControlFieldIDWildcard = string

export type AssetOptionField =
	| Types.Inputs.TextField
	| Types.Inputs.SelectFieldStat
	// | Types.Inputs.SelectFieldNumber
	| Types.Inputs.SelectFieldExtendAsset

export type AssetControlField =
	| Types.Inputs.CheckboxField
	| Types.Inputs.ConditionMeterField
	| Types.Inputs.SelectFieldExtendAsset

export type InputFieldExtension<T extends InputFieldBase> = PartialDeep<
	Omit<T, 'id' | 'field_type' | 'label' | 'value'>
>

export type AssetControlFieldExtension = Simplify<
	InputFieldExtension<Types.Inputs.ConditionMeterField>
>

export interface Asset
	extends Omit<Types.Abstract.SourcedNode<AssetID>, 'suggestions'> {
	id: string
	source: Types.Metadata.Source
	name: Types.Localize.Label
	options?: Record<string, AssetOptionField>
	requirement?: Types.Localize.MarkdownPhrase
	abilities: AssetAbility[]
	controls?: Record<string, AssetControlField>
	count_as_impact?: boolean
	attachments?: AssetAttachment
	shared?: boolean
}

export interface AssetExtensionForeign
	extends Types.Abstract.ExtendOne<
		Omit<Asset, 'options' | 'abilities' | 'requirement' | 'shared' | 'controls'>
	> {
	controls?: Record<string, AssetControlFieldExtension>
}

export interface AssetsExtension extends Types.Abstract.ExtendMany<Asset> {
	abilities?: never
}

export type AssetAbilityID = string

export type AssetAbilityOptionFieldID = string
export type AssetAbilityControlFieldID = string

export type AssetAbilityOptionField = AssetOptionField & {
	id: AssetAbilityOptionFieldID
}

export type AssetAbilityControlField = (
	| Types.Inputs.ClockField
	| Types.Inputs.CounterField
	| Types.Inputs.CheckboxField
) & { id: AssetAbilityControlFieldID }

export interface AssetAbility extends Types.Abstract.Node<AssetAbilityID> {
	name?: Types.Localize.Label
	text: Types.Localize.MarkdownParagraph
	enabled: boolean
	moves?: Record<string, Types.Moves.Move>
	options?: Record<string, AssetAbilityOptionField>
	controls?: Record<string, AssetAbilityControlField>
	extend_asset?: AssetExtension
	extend_moves?: Types.Moves.MoveExtension[]
}

export type AssetExtension = Simplify<
	Omit<
		AssetExtensionForeign,
		// it's implicit that it applies to this asset specifically
		'extends' | 'id' | 'abilities' | 'requirement'
	>
>

export interface AssetAttachment {
	assets: Array<RegExp['source']>
	max?: number
}

// expected to be manipulated throughout the life of the asset
export interface ToggleField
	extends Types.Inputs.InputFieldBase,
		Types.Abstract.ChoicesBase {
	field_type: 'toggle'
}

export interface ToggleFieldOption extends Types.Abstract.ChoiceBase {
	value: Types.Assets.AssetExtension
}
