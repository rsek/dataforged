import { type Static, type TRef, type TString, Type } from '@sinclair/typebox'
import { type Simplify } from 'type-fest'
import { DiscriminatedUnion } from '../../../typebox/discriminated-union.js'
import { Id, Fields } from '../common/index.js'
import * as Generic from '../utils/Generic.js'


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
function AssetCheckboxField(id: TRef<TString>) {
	const base = Fields.CheckboxField(id)
	const { $comment, description } = base
	return Generic.Flatten([Fields.CheckboxField(id), AssetBooleanFieldMixin], {
		description,
		$comment,
		title: 'AssetCheckboxField'
	})
}
function AssetCardFlipField(id: TRef<TString>) {
	const base = Fields.CardFlipField(id)
	const { $comment, description } = base
	return Generic.Flatten([base, AssetBooleanFieldMixin], {
		description,
		$comment,
		title: 'AssetCardFlipField'
	})
}

export const AssetConditionMeterControlField = DiscriminatedUnion(
	Fields.DISCRIMINATOR,
	[AssetCheckboxField, AssetCardFlipField].map((fn) =>
		fn(Type.Ref(Id.AssetConditionMeterControlFieldId))
	),
	{
		$id: '#/$defs/AssetConditionMeterControlField',
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

export const AssetConditionMeter = Generic.Flatten(
	[
		Fields.ConditionMeterField(Type.Ref(Id.AssetControlFieldId)),
		AssetConditionMeterMixin
	],
	{
		$id: '#/$defs/AssetConditionMeter',
		description:
			'Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".'
	}
)

export type AssetConditionMeter = Simplify<Static<typeof AssetConditionMeter>>

const AssetOptionFields = [
	Fields.SelectStatField,
	Fields.SelectEnhancementField,
	Fields.TextField
].map((fn) => fn(Type.Ref(Id.AssetOptionFieldId)))

export const AssetOptionField = DiscriminatedUnion(
	Fields.DISCRIMINATOR,
	AssetOptionFields,
	{ $id: '#/$defs/AssetOptionField', title: 'AssetOptionField' }
)
export type AssetOptionField = Static<typeof AssetOptionField>
export type TAssetOptionField = typeof AssetOptionField

const AssetControlFields = [
	AssetConditionMeter,
	...[
		Fields.SelectEnhancementField,
		AssetCheckboxField,
		AssetCardFlipField
	].map((fn) => fn(Type.Ref(Id.AssetControlFieldId)))
]

export const AssetControlField = DiscriminatedUnion(
	Fields.DISCRIMINATOR,
	AssetControlFields,
	{
		$id: '#/$defs/AssetControlField',
		title: 'AssetControlField'
	}
)


export type TAssetControlField = typeof AssetControlField
export type AssetControlField = Static<typeof AssetControlField>

const AbilityControlFields = [
	Fields.ClockField,
	Fields.CounterField,
	AssetCheckboxField
].map((fn) => fn(Type.Ref(Id.AssetAbilityControlFieldId)))

export const AssetAbilityControlField = DiscriminatedUnion(
	Fields.DISCRIMINATOR,
	AbilityControlFields,
	{ $id: '#/$defs/AssetAbilityControlField', title: 'AssetAbilityControlField' }
)

export type AssetAbilityControlField = Static<typeof AssetAbilityControlField>

const AbilityOptionFields = [Fields.TextField].map((fn) =>
	fn(Type.Ref(Id.AssetAbilityOptionFieldId))
)

export const AssetAbilityOptionField = DiscriminatedUnion(
	'field_type',
	AbilityOptionFields,
	{ $id: '#/$defs/AssetAbilityOptionField', title: 'AssetAbilityOptionField' }
)

export type AssetAbilityOptionField = Static<typeof AssetAbilityOptionField>
