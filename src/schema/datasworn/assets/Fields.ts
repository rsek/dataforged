import { type ObjectOptions, Type, type Static } from '@sinclair/typebox'
import { type Simplify } from 'type-fest'
import * as Generic from '../Generic.js'
import * as Utils from '../Utils.js'
import { Fields, Id } from '../common/index.js'

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

function AssetCheckboxField(id: Id.TAnyId, options: ObjectOptions = {}) {
	const base = Fields.CheckboxField(id)
	const { $comment, description } = base
	return Utils.Assign([Fields.CheckboxField(id), AssetBooleanFieldMixin], {
		description,
		$comment,
		title: 'AssetCheckboxField',
		...options
	})
}
function AssetCardFlipField(id: Id.TAnyId, options: ObjectOptions = {}) {
	const base = Fields.CardFlipField(id)
	const { $comment, description } = base
	return Utils.Assign([base, AssetBooleanFieldMixin], {
		description,
		$comment,
		title: 'AssetCardFlipField',
		...options
	})
}

export const AssetConditionMeterControlField = Utils.DiscriminatedUnion(
	[AssetCheckboxField, AssetCardFlipField].map((fn) =>
		fn(Type.Ref(Id.AssetConditionMeterControlFieldId))
	),
	Fields.DISCRIMINATOR,
	{
		$id: 'AssetConditionMeterControlField',
		description:
			'A checkbox control field, rendered as part of an asset condition meter.'
	}
)
export type AssetConditionMeterControlField = Static<
	typeof AssetConditionMeterControlField
>
const AssetConditionMeterMixin = Type.Object({
	moves: Type.Optional(
		Type.Object(
			{
				suffer: Type.Optional(
					Type.Array(
						Type.Ref(Id.MoveIdWildcard, {
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
						Type.Ref(Id.MoveIdWildcard, {
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
		Generic.Dictionary(Type.Ref(AssetConditionMeterControlField), {
			description: 'Checkbox controls rendered as part of the condition meter.'
		})
	)
})

export const AssetConditionMeter = Utils.Assign(
	[
		Fields.ConditionMeterField(Type.Ref(Id.AssetControlFieldId)),
		AssetConditionMeterMixin
	],
	{
		$id: 'AssetConditionMeter',
		description:
			'Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".'
	}
)

export type AssetConditionMeter = Simplify<Static<typeof AssetConditionMeter>>

// const AssetOptionFields = [
// 	Fields.SelectValueField,
// 	Fields.SelectEnhancementField,
// 	Fields.TextField
// ].map((fn) => fn(Type.Ref(Id.AssetOptionFieldId)))

export const AssetSelectValueOptionField = Fields.SelectValueField(
	Type.Ref(Id.AssetOptionFieldId),
	{ $id: 'AssetSelectValueOptionField' }
)
export const AssetSelectEnhancementOptionField = Fields.SelectEnhancementField(
	Type.Ref(Id.AssetOptionFieldId),
	{ $id: 'AssetSelectEnhancementOptionField' }
)
export const AssetTextOptionField = Fields.TextField(
	Type.Ref(Id.AssetOptionFieldId),
	{
		$id: 'AssetTextOptionField'
	}
)

export const AssetOptionField = Utils.DiscriminatedUnion(
	[
		AssetSelectValueOptionField,
		AssetSelectEnhancementOptionField,
		AssetTextOptionField
	],
	Fields.DISCRIMINATOR,
	{
		$id: 'AssetOptionField',
		description:
			'Options are asset input fields which are set once, usually when the character takes the asset. The most common example is the "name" field on companion assets. A more complex example is the choice of a god\'s stat for the Devotant asset.'
	}
)
export type AssetOptionField = Static<typeof AssetOptionField>
export type TAssetOptionField = typeof AssetOptionField

// const AssetControlFields = [
// 	AssetConditionMeter,
// 	...[
// 		Fields.SelectEnhancementField,
// 		AssetCheckboxField,
// 		AssetCardFlipField
// 	].map((fn) => fn(Type.Ref(Id.AssetControlFieldId)))
// ]

export const AssetSelectEnhancementControlField = Fields.SelectEnhancementField(
	Type.Ref(Id.AssetControlFieldId),
	{ $id: 'AssetSelectEnhancementControlField' }
)
export const AssetCheckboxControlField = AssetCheckboxField(
	Type.Ref(Id.AssetControlFieldId),
	{ $id: 'AssetCheckboxControlField' }
)
export const AssetCardFlipControlField = AssetCardFlipField(
	Type.Ref(Id.AssetControlFieldId),
	{ $id: 'AssetCardFlipControlField' }
)

export const AssetControlField = Utils.DiscriminatedUnion(
	[
		AssetConditionMeter,
		AssetSelectEnhancementControlField,
		AssetCheckboxControlField,
		AssetCardFlipControlField
	],
	Fields.DISCRIMINATOR,
	{
		$id: 'AssetControlField'
	}
)

export type TAssetControlField = typeof AssetControlField
export type AssetControlField = Static<typeof AssetControlField>

// const AbilityControlFields = [
// 	Fields.ClockField,
// 	Fields.CounterField,
// 	AssetCheckboxField
// ].map((fn) => fn(Type.Ref(Id.AssetAbilityControlFieldId)))

export const AssetAbilityClock = Fields.ClockField(
	Type.Ref(Id.AssetAbilityControlFieldId),
	{ $id: 'AssetAbilityClock' }
)

export const AssetAbilityCounter = Fields.CounterField(
	Type.Ref(Id.AssetAbilityControlFieldId),
	{ $id: 'AssetAbilityCounter' }
)

export const AssetAbilityCheckbox = AssetCheckboxField(
	Type.Ref(Id.AssetAbilityControlFieldId),
	{ $id: 'AssetAbilityCheckbox' }
)
export const AssetAbilityControlField = Utils.DiscriminatedUnion(
	[AssetAbilityClock, AssetAbilityCounter, AssetAbilityCheckbox],
	Fields.DISCRIMINATOR,
	{ $id: 'AssetAbilityControlField' }
)

export type AssetAbilityControlField = Static<typeof AssetAbilityControlField>

const AbilityOptionFields = [Fields.TextField].map((fn) =>
	fn(Type.Ref(Id.AssetAbilityOptionFieldId))
)

export const AssetAbilityOptionField = Utils.DiscriminatedUnion(
	AbilityOptionFields,
	Fields.DISCRIMINATOR,
	{ $id: 'AssetAbilityOptionField' }
)

export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>

export {
	SelectEnhancementFieldChoice,
	SelectEnhancementFieldChoiceGroup,
	SelectValueFieldChoice
} from '../common/Fields.js'
