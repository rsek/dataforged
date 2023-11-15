import {
	type Static,
	Type,
	type TObject,
	type TString,
	type ObjectOptions,
	type TRef,
	Kind,
	type TUnsafe
} from '@sinclair/typebox'
import { Localize, ID, Metadata, Inputs, Abstract } from './common/index.js'
import { Dictionary } from './common/abstract.js'
import { AssetID } from './common/id.js'
import { Label } from './common/localize.js'
import * as Moves from './moves.js'
import { PolymorphicWithID } from './common/utils.js'

const $idSelectFieldAssetState = '#/$defs/SelectFieldAssetState'

const isImpact = Type.Boolean({
	default: false,
	description:
		'Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?'
})
const disablesAsset = Type.Boolean({
	default: false,
	description:
		'Does this field disable the asset when its value is set to `true`?'
})

export const AssetCheckboxField = Type.Composite(
	[
		Inputs.CheckboxField,
		Type.Object({
			is_impact: isImpact,
			disables_asset: disablesAsset
		})
	],
	{
		$id: '#/$defs/AssetCheckboxField'
	}
)

export const AssetCardFlipField = Type.Composite(
	[
		Inputs.CardFlipField,
		Type.Object({
			disables_asset: disablesAsset
		})
	],
	{
		description: Inputs.CardFlipField.description,
		$id: '#/$defs/AssetCardFlipField'
	}
)

export const AssetConditionMeterControlField = PolymorphicWithID(
	'AssetConditionMeterControlField',
	Type.Ref(ID.AssetConditionMeterControlFieldID),
	[AssetCheckboxField].map((schema) => Type.Ref(schema))
)

export const AssetConditionMeter = Type.Object(
	{
		...Inputs.Meter.properties,
		id: Type.Ref(ID.AssetControlFieldID),
		field_type: Type.Literal('condition_meter'),
		label: Type.Ref(Label),
		moves: Type.Optional(
			Type.Object(
				{
					suffer: Type.Optional(
						Type.Array(
							Type.Ref(ID.MoveIDWildcard, {
								examples: [
									'classic/moves/suffer/companion_endure_harm',
									'starforged/moves/suffer/companion_takes_a_hit',
									'starforged/moves/suffer/withstand_damage'
								]
							}),
							{
								description:
									'The ID(s) of suffer moves associated with the condition meter. If the suffer move makes an action roll, this condition meter value should be made available as a roll option.'
							}
						)
					),
					recover: Type.Optional(
						Type.Array(
							Type.Ref(ID.MoveIDWildcard, {
								examples: [
									'classic/moves/adventure/heal',
									'classic/moves/adventure/make_camp',
									'classic/moves/relationship/sojourn',
									'starforged/moves/recover/heal',
									'starforged/moves/recover/repair'
								]
							}),
							{
								description:
									'The ID(s) of recovery moves associated with this meter.'
							}
						)
					)
				},
				{
					description:
						'Provides hints for moves that interact with this condition meter, such as suffer and recovery moves.',
					releaseStage: 'unstable'
				}
			)
		),
		controls: Type.Optional(
			Dictionary(Type.Ref(AssetConditionMeterControlField))
		)
	},
	{
		$id: '#/$defs/AssetConditionMeter',
		title: 'Asset condition meter',
		description:
			'Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".\n\nThe asset condition meter is always rendered at the bottom of the card.'
	}
)

export const AssetConditionMeterEnhancement = Type.Partial(
	Type.Omit(AssetConditionMeter, [
		'label',
		'value',
		'id',
		'moves',
		'min',
		'field_type'
	]),
	{ $id: '#/$defs/AssetConditionMeterEnhancement' }
)
export type AssetConditionMeterEnhancement = Static<
	typeof AssetConditionMeterEnhancement
>

export const AssetOptionField = PolymorphicWithID(
	'AssetOptionField',
	Type.Ref(ID.AssetOptionFieldID),
	[Inputs.SelectFieldStat, Inputs.TextField].map((s) => Type.Ref(s))
)

export const AssetControlField = PolymorphicWithID(
	'AssetControlField',
	Type.Ref(ID.AssetControlFieldID),
	[
		...[AssetConditionMeter, Inputs.CheckboxField, AssetCardFlipField].map(
			(s) => Type.Ref(s)
		),
		// manually type as a ref so the type system doesn't flip out
		Type.Unsafe<
			Inputs.InputField<'select_enhancement', Record<string, unknown>>
		>({ $ref: $idSelectFieldAssetState })
	]
)

function AssetEnhanceSelf<T extends TObject>(
	tAsset: T,
	omitKeys: Array<keyof Static<TObject>> = [],
	options: ObjectOptions = {}
) {
	omitKeys = [
		...omitKeys,
		// metadata & cosmetic keys
		'asset_type',
		'icon',
		'color',
		'suggestions',
		'requirement',
		'options' // options are set when you take the asset, so it doesn't make sense to change them
	]

	// condition meters need special handling, so we need to strip it regardless
	const base = Abstract.NodeEnhanceSelf(
		tAsset as any,
		[...omitKeys, 'controls'],
		options
	)

	if (omitKeys.includes('controls')) return base

	// condition meters have their own enhance schema
	return Type.Composite(
		[
			base,
			Type.Object({
				controls: Type.Optional(
					Dictionary(Type.Ref(AssetConditionMeterEnhancement))
				)
			})
		],
		options
	)
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
		asset_type: Type.Ref(Localize.Label, {
			description:
				"A localized category label for this asset. This is the surtitle above the asset's name on the card.",
			examples: [
				'Combat Talent',
				'Command Vehicle',
				'Companion',
				'Deed',
				'Module',
				'Path',
				'Ritual',
				'Support Vehicle'
			]
			// i18n: true
		}),
		source: Type.Ref(Metadata.Source),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		color: Type.Optional(Type.Ref(Metadata.CSSColor)),
		options: Type.Optional(
			Abstract.Dictionary(Type.Ref(AssetOptionField), {
				description:
					'Options are asset input fields which are set once, usually when the character takes the asset. The most common example is the "name" field on companion assets. A more complex example is the choice of a god\'s stat for the Devotant asset.'
			})
		),
		controls: Type.Optional(
			Abstract.Dictionary(Type.Ref(AssetControlField), {
				description:
					'Controls are condition meters and other asset input fields whose values are expected to change throughout the life of the asset. Usually these occur as checkboxes on condition meters, but a few assets also use them for counters or clocks.'
			})
		),
		suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
		requirement: Type.Optional(Type.Ref(Localize.MarkdownString)),
		abilities: Type.Array(Type.Unsafe({ $ref: '#/$defs/AssetAbility' }), {
			description: 'Abilities provided by this asset. Most assets have 3.'
		}),
		// condition_meter: Type.Optional(Type.Ref(AssetConditionMeter)),
		count_as_impact: Type.Boolean({
			default: false,
			description:
				'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).'
		}),
		attachments: Type.Optional(Type.Ref(AssetAttachment)),
		shared: Type.Boolean({
			default: false,
			description:
				"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too."
		})
	},
	{ $id: '#/$defs/Asset', title: 'Asset', additionalProperties: false }
)

export type Asset = Static<typeof Asset>

export const SelectFieldAssetState = Inputs.SelectField(
	'select_enhancement',
	AssetEnhanceSelf(Asset, ['abilities', 'controls', 'condition_meter']),
	{
		$id: $idSelectFieldAssetState,
		title: 'Select field (asset enhancement)',
		description:
			'Select a defined asset state, which may enhance the asset. For examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).'
	}
)
export type SelectFieldAssetState = Static<typeof SelectFieldAssetState>

export const AssetAbilityOptionField = PolymorphicWithID(
	'AssetAbilityOptionField',
	Type.Ref(ID.AssetAbilityOptionFieldID),
	[Inputs.TextField].map((s) => Type.Ref(s))
)

export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export const AssetAbilityControlField = PolymorphicWithID(
	'AssetAbilityControlField',
	Type.Ref(ID.AssetAbilityControlFieldID),
	[
		Inputs.ClockField,
		Inputs.CounterField,
		Inputs.CheckboxField
		// Inputs.SelectAssetEnhance(AssetEnhanceSelf(Asset, []) as TObject)
	].map((s) => Type.Ref(s))
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
		enhance_asset: Type.Optional(
			AssetEnhanceSelf(Asset, ['abilities'], {
				description:
					'Describes enhancements made to this asset in a partial asset object. The changes should be applied recursively; only the values that are specified should be changed.',
				releaseStage: 'unstable'
			})
		),
		enhance_moves: Type.Optional(
			Type.Array(Type.Ref(Moves.MoveEnhancement), {
				description:
					'Describes changes made to various moves by this asset ability. Usually these require specific trigger conditions.',
				releaseStage: 'experimental'
			})
		)
	},
	{ $id: '#/$defs/AssetAbility' }
)
export type AssetAbility = Static<typeof AssetAbility>

export const AssetType = Abstract.Collection(
	Type.Ref(Asset),
	Type.Ref(ID.AssetTypeID),
	Type.Object({}),
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>

// const AssetTypeEnhance = Type.Composite(
// 	[
// 		Type.Object({
// 			type: Type.Literal('extension')
// 		})
// 	],
// 	{ $id: '#/$defs/AssetTypeEnhance' }
// )
// export type AssetTypeEnhance = Static<typeof AssetTypeEnhance>

const AssetImportAbility = Type.Composite([Type.Partial(AssetAbility)], {
	$id: '#/$defs/AssetImportAbility'
})

const AssetImport = Type.Composite(
	[
		Type.Object({
			type: Type.Literal('import'),
			import: Type.Ref(AssetID),
			abilities: Type.Optional(Type.Array(AssetImportAbility))
			// this *could* be a yaml-only situation that builds out the final asset in question. but it'd have to be deferred until the asset it depends on is built
			// OTOH: is the use case of "clone an existing asset" better handled with a GUI?
		}),
		Type.Omit(Type.Partial(Asset), ['abilities', 'id'])
	],
	{ $id: '#/$defs/AssetImport' }
)
export type AssetImport = Static<typeof AssetImport>

export {
	CheckboxField,
	ClockField,
	CounterField,
	TextField,
	SelectFieldStat
	// SelectFieldRef
} from './common/inputs.js'

// what about a general purpose asset ability switch?
// e.g. when [state], use this asset ability data.

// not sure modelling 'forced' impacts is worth it, tbh

// field_type: select_state
// the value for each select_state option is a partial of the asset ability data: {enhance_moves, enhance_asset} are the only permitted properties.
//

// alternate approach: some feature of enhances, like requires_state: some_state_id?
