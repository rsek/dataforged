import type * as Types from '@base-types'

export type AssetID = string

export type AssetTypeID = string

export interface AssetType extends Types.Abstract.Collection<Asset> {}

export type AssetOptionFieldID = string
export type AssetControlFieldID = string

export type AssetOptionField =
	| Types.Inputs.TextField
	| Types.Inputs.StatIDChoicesField
	| Types.Inputs.NumberChoicesField
	| Types.Inputs.AssetExtensionChoicesField

export type AssetControlField =
	| Types.Inputs.CheckboxField
	| Types.Inputs.ConditionMeterField
	| Types.Inputs.AssetExtensionChoicesField
export interface Asset
	extends Omit<Types.Abstract.SourcedNode<AssetID>, 'suggestions'> {
	id: string
	source: Types.Metadata.Source
	name: Types.Localize.Label
	// TODO: document - options are the stuff you generally set once when you buy the asset
	options?: Record<string, AssetOptionField>
	requirement?: Types.Localize.MarkdownPhrase
	abilities: AssetAbility[]
	// TODO: document - controls are the stuff that changes throughout the life of an asset
	// TODO: rename this -- "inputs"? "attributes"?
	controls?: Record<string, AssetControlField>
	count_as_impact?: boolean
	attachments?: AssetAttachment
	shared?: boolean
	// TODO: is there a good way to make the ID unique + regexable?
	// condition_meter?: Attr
}

export interface AssetExtensionForeign
	extends Types.Abstract.ExtendOne<Omit<Asset, 'options'>> {}

export interface AssetsExtension extends Types.Abstract.ExtendMany<Asset> {
	abilities?: never
}

export type AssetAbilityID = string

export type AssetAbilityOptionFieldID = string
export type AssetAbilityControlFieldID = string

export type AssetAbilityOptionField = Types.Inputs.TextField & {
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

export interface AssetExtension
	extends Omit<
		AssetExtensionForeign,
		// it's implicit that it applies to this asset specifically
		'_extends' | 'id' | 'abilities' | 'requirement'
	> {}

export interface AssetAttachment {
	patterns: Array<RegExp['source']>
	max: number | null
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
