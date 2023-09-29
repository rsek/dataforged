import {
	type Static,
	Type,
	type TObject,
	type TString,
	type ObjectOptions
} from '@sinclair/typebox'
import { startCase } from 'lodash'
import { Localize, ID, Metadata, Inputs, Abstract } from 'schema/common'
import { Dictionary } from 'schema/common/abstract'
import { AssetID } from 'schema/common/id'
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
		$id: '#/$defs/AssetCardFlipField'
	}
)

export const AssetConditionMeterControlField = AssetField(
	'AssetConditionMeterControlField',
	ID.AssetConditionMeterControlFieldID,
	[AssetCheckboxField]
)

export const AssetConditionMeter = Type.Object(
	{
		...Inputs.Meter.properties,
		id: Type.Ref(ID.AssetConditionMeterID),
		label: Type.Ref(Label),
		moves: Type.Optional(
			Type.Object(
				{
					suffer: Type.Optional(
						Type.Ref(ID.MoveID, {
							description:
								"The ID of the suffer move associated with the condition meter. If the suffer move makes an action roll, it may use this condition meter's value as a stat option.",
							examples: [
								'classic/moves/suffer/companion_endure_harm',
								'starforged/moves/suffer/companion_takes_a_hit',
								'starforged/moves/suffer/withstand_damage'
							]
						})
					),
					recover: Type.Optional(
						Type.Ref(ID.MoveID, {
							description:
								'The ID of the primary recover move associated with the condition meter. When in doubt, prefer the most specific move that can be used in the field, or whatever would be most useful to have presented as a shortcut.',
							examples: [
								'classic/moves/adventure/heal',
								'starforged/moves/recover/heal',
								'starforged/moves/recover/repair'
							]
						})
					)
				},
				{
					description:
						'Provides hints for moves that interact with this condition meter, such as suffer and recovery moves.',
					examples: [
						{
							suffer: 'classic/moves/suffer/endure_companion_harm',
							recover: 'classic/moves/adventure/heal'
						},
						{
							suffer: 'starforged/moves/suffer/companion_takes_a_hit',
							recover: 'starforged/moves/recover/heal'
						},
						{
							suffer: 'starforged/moves/suffer/withstand_damage',
							recover: 'starforged/moves/recover/repair'
						}
					]
				}
			)
		),
		controls: Type.Optional(
			Dictionary(Type.Ref(AssetConditionMeterControlField), {
				description:
					'Controls are asset input fields whose values are expected to change throughout the life of the asset. Usually these occur as checkboxes on condition meters, but a few assets also use them for counters or clocks.'
			})
		)
	},
	{
		$id: '#/$defs/AssetConditionMeter',
		title: 'Asset condition meter',
		description:
			'Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".\n\nThe asset condition meter is always rendered at the bottom of the card.'
	}
)

export const AssetConditionMeterAugment = Type.Partial(
	Type.Omit(AssetConditionMeter, ['label', 'value', 'id']),
	{ $id: '#/$defs/AssetConditionMeterAugment' }
)

export const AssetOptionField = AssetField(
	'AssetOptionField',
	ID.AssetOptionFieldID,
	[Inputs.SelectFieldStat, Inputs.TextField]
)

// TODO: selectFieldAugmentAsset. for e.g. Ironclad
export const AssetControlField = AssetField(
	'AssetControlField',
	ID.AssetControlFieldID,
	[Inputs.CheckboxField, AssetCardFlipField]
)

function AssetAugmentSelf<T extends TObject>(
	tAsset: T,
	omitKeys: Array<keyof Static<TObject>> = [],
	options: ObjectOptions = {}
) {
	omitKeys = [
		...omitKeys,
		'requirement',
		'options',
		'controls' // in practice, i don't think anyone's setting a control in order to create a temporary control
	]
	if (omitKeys.includes('condition_meter'))
		return Abstract.NodeAugmentSelf(tAsset as any, omitKeys, options)
	return Type.Intersect(
		[
			Abstract.NodeAugmentSelf(tAsset as any, [...omitKeys, 'condition_meter']),
			Type.Object({
				condition_meter: Type.Optional(Type.Ref(AssetConditionMeterAugment))
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
			i18n: true
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
					'Controls are asset input fields whose values are expected to change throughout the life of the asset. Usually these occur as checkboxes on condition meters, but a few assets also use them for counters or clocks.'
			})
		),
		suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
		requirement: Type.Optional(Type.Ref(Localize.MarkdownString)),
		abilities: Type.Array(Type.Unsafe({ $ref: '#/$defs/AssetAbility' }), {
			minItems: 3,
			maxItems: 3
		}),
		condition_meter: Type.Optional(Type.Ref(AssetConditionMeter)),
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
	[
		Inputs.ClockField,
		Inputs.CounterField,
		Inputs.CheckboxField
		// Inputs.SelectAssetAugment(AssetAugmentSelf(Asset, []) as TObject)
	]
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
		augment_asset: Type.Optional(
			AssetAugmentSelf(Asset, ['abilities'], {
				description:
					'Describes augmentations made to this asset in a partial asset object. The changes should be applied recursively; only the values that are specified should be changed.',
				releaseStage: 'experimental'
			})
		),
		augment_moves: Type.Optional(
			Type.Array(Type.Ref(Moves.MoveAugment), {
				description:
					'Describes changes made to various moves by this asset ability. Usually these require specific trigger conditions are met.',
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
	{
		member_label: Type.Optional(Type.Ref(Localize.Label))
	},
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>

const AssetTypeAugment = Type.Composite(
	[
		Type.Object({
			type: Type.Literal('extension')
		})
	],
	{ $id: '#/$defs/AssetTypeAugment' }
)
export type AssetTypeAugment = Static<typeof AssetTypeAugment>

const AssetImportAbility = Type.Composite([Type.Partial(AssetAbility)], {
	$id: '#/$defs/AssetImportAbility'
})

const AssetImport = Type.Composite(
	[
		Type.Object({
			type: Type.Literal('import'),
			import: Type.Ref(AssetID),
			abilities: Type.Optional(
				Type.Tuple([
					Type.Ref(AssetImportAbility),
					Type.Ref(AssetImportAbility),
					Type.Ref(AssetImportAbility)
				])
			)
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
	SelectFieldStat,
	SelectFieldRef
} from 'schema/common/inputs'

// what about a general purpose asset ability switch?
// e.g. when [state], use this asset ability data.

// not sure modelling 'forced' impacts is worth it, tbh

// field_type: select_state
// the value for each select_state option is a partial of the asset ability data: {augment_moves, augment_asset} are the only permitted properties.
//

// alternate approach: some feature of augments, like requires_state: some_state_id?
