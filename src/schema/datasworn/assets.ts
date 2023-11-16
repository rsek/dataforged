import { TSchema, Type, type Static } from '@sinclair/typebox'
import { Dictionary } from './common/abstract.js'
import {
	Abstract,
	ID,
	Inputs,
	Localize,
	Metadata,
	Utils
} from './common/index.js'
import * as Moves from './moves.js'
import { NoDefaults } from './common/utils.js'

const AssetBooleanFieldMixin = Type.Object({
	is_impact: Type.Boolean({
		default: false,
		description:
			'Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?'
	}),
	disables_asset: Type.Boolean({
		default: false,
		description:
			'Does this field disable the asset when its value is set to `true`?'
	})
})

export const AssetCheckboxField = Type.Composite(
	[Inputs.CheckboxField, AssetBooleanFieldMixin],
	{
		description: Inputs.CheckboxField.description,
		additionalProperties: false,
		$id: '#/$defs/AssetCheckboxField'
	}
)
export type AssetCheckboxField = Static<typeof AssetCheckboxField>

export const AssetCardFlipField = Type.Composite(
	[Inputs.CardFlipField, AssetBooleanFieldMixin],
	{
		description: Inputs.CardFlipField.description,
		additionalProperties: false,
		$id: '#/$defs/AssetCardFlipField'
	}
)
export type AssetCardFlipField = Static<typeof AssetCardFlipField>

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
export type AssetAttachment = Static<typeof AssetAttachment>

export const AssetConditionMeterControlField = Utils.PolymorphicWithID(
	Type.Ref(ID.AssetConditionMeterControlFieldID),
	[Type.Ref(AssetCheckboxField), Type.Ref(AssetCardFlipField)],
	{
		$id: '#/$defs/AssetConditionMeterControlField'
	}
)
export type AssetConditionMeterControlField = Static<
	typeof AssetConditionMeterControlField
>

export const AssetConditionMeter = Type.Composite(
	[
		Inputs.MeterBase,
		Type.Object({
			id: Type.Ref(ID.AssetControlFieldID),
			field_type: Type.Literal('condition_meter'),
			label: Type.Ref(Localize.Label),
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
		})
	],
	{
		$id: '#/$defs/AssetConditionMeter',
		description:
			'Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".'
	}
)

export type AssetConditionMeter = Static<typeof AssetConditionMeter>

export const AssetConditionMeterEnhancement = NoDefaults(
	Type.Partial(
		Type.Omit(AssetConditionMeter, [
			'label',
			'value',
			'id',
			'moves',
			'min',
			'field_type',
			'controls' // condition meters accept only boolean controls, which can't be enhanced
		]),
		{ $id: '#/$defs/AssetConditionMeterEnhancement' }
	)
)
export type AssetConditionMeterEnhancement = Static<
	typeof AssetConditionMeterEnhancement
>

export const AssetOptionField = Utils.PolymorphicWithID(
	Type.Ref(ID.AssetOptionFieldID),
	[Type.Ref(Inputs.SelectFieldStat), Type.Ref(Inputs.TextField)],
	{ $id: '#/$defs/AssetOptionField' }
)
export type AssetOptionField = Static<typeof AssetOptionField>

function AssetPropertiesEnhanceable<Controls extends TSchema>(
	controls: Controls
) {
	return Type.Object({
		controls,
		suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
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
	})
}

export const AssetEnhancement = Utils.DeepPartial(
	NoDefaults(
		AssetPropertiesEnhanceable(
			// for the moment, it's only practical to enhance condition meters
			Type.Optional(Dictionary(Type.Ref(AssetConditionMeterEnhancement)))
		)
	),
	{
		description:
			'Describes enhancements made to this asset in a partial asset object. The changes should be applied recursively; only the values that are specified should be changed.',
		$id: '#/$defs/AssetEnhancement'
	}
)

export type AssetEnhancement = Static<typeof AssetEnhancement>

export const SelectFieldAssetEnhancement = Inputs.SelectField(
	'select_enhancement',
	Type.Ref(AssetEnhancement),
	{
		$id: '#/$defs/SelectFieldAssetEnhancement',
		title: 'Select field (asset enhancement)',
		description:
			'Select from a set of AssetEnhancements. Use it to describe modal abilities. For examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).'
	}
)
export type SelectFieldAssetEnhancement = Static<
	typeof SelectFieldAssetEnhancement
>

export const AssetControlField = Utils.PolymorphicWithID(
	Type.Ref(ID.AssetControlFieldID),
	[
		Type.Ref(AssetConditionMeter),
		Type.Ref(AssetCheckboxField),
		Type.Ref(AssetCardFlipField),
		// manually typed so that the type system doesn't flip out. doesnt provide a useful typing for the field value, but we generate static types from the finished schema anyways.
		Type.Ref(SelectFieldAssetEnhancement)
	],
	{ $id: '#/$defs/AssetControlField' }
)

export type AssetControlField = Static<typeof AssetControlField>

export const Asset = Type.Composite(
	[
		AssetPropertiesEnhanceable(
			Type.Optional(
				Abstract.Dictionary(Type.Ref(AssetControlField), {
					description:
						'Controls are condition meters, clocks, counters, and other asset input fields whose values are expected to change throughout the life of the asset.'
				})
			)
		),
		Type.Object({
			name: Type.Ref(Localize.Label),
			id: Type.Ref(ID.AssetID),
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
			requirement: Type.Optional(Type.Ref(Localize.MarkdownString)),

			abilities: Type.Array(
				Type.Ref('#/$defs/AssetAbility', {
					description: 'Abilities provided by this asset. Most assets have 3.'
				})
			)
		})
	],
	{ $id: '#/$defs/Asset', title: 'Asset', additionalProperties: false }
)

export type Asset = Static<typeof Asset>

export const AssetAbilityOptionField = Utils.PolymorphicWithID(
	Type.Ref(ID.AssetAbilityOptionFieldID),
	[Type.Ref(Inputs.TextField)],
	{ $id: '#/$defs/AssetAbilityOptionField' }
)

export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export const AssetAbilityControlField = Utils.PolymorphicWithID(
	Type.Ref(ID.AssetAbilityControlFieldID),
	[
		Type.Ref(Inputs.ClockField),
		Type.Ref(Inputs.CounterField),
		Type.Ref(AssetCheckboxField)
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
		enhance_asset: Type.Optional(Type.Ref(AssetEnhancement)),
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

// const AssetImportAbility = Type.Composite([Type.Partial(AssetAbility)], {
// 	$id: '#/$defs/AssetImportAbility'
// })

// const AssetImport = Type.Composite(
// 	[
// 		Type.Object({
// 			type: Type.Literal('import'),
// 			import: Type.Ref(AssetID),
// 			abilities: Type.Optional(Type.Array(AssetImportAbility))
// 			// this *could* be a yaml-only situation that builds out the final asset in question. but it'd have to be deferred until the asset it depends on is built
// 			// OTOH: is the use case of "clone an existing asset" better handled with a GUI?
// 		}),
// 		Type.Omit(Type.Partial(Asset), ['abilities', 'id'])
// 	],
// 	{ $id: '#/$defs/AssetImport' }
// )
// export type AssetImport = Static<typeof AssetImport>

export {
	CheckboxField,
	ClockField,
	CounterField,
	SelectFieldStat,
	// SelectFieldRef
	TextField
} from './common/inputs.js'

// what about a general purpose asset ability switch?
// e.g. when [state], use this asset ability data.

// not sure modelling 'forced' impacts is worth it, tbh

// field_type: select_state
// the value for each select_state option is a partial of the asset ability data: {enhance_moves, enhance_asset} are the only permitted properties.
//

// alternate approach: some feature of enhances, like requires_state: some_state_id?
