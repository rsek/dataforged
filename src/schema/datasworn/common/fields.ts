import {
	Type,
	type ObjectOptions,
	type ObjectProperties,
	type Static,
	type TLiteral,
	type TObject,
	type TRef,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import { LiteralZero } from './utils.js'
import * as Player from './player.js'
import {
	Checkbox,
	Clock,
	Counter,
	Input,
	Meter,
	Select,
	SelectOption,
	TextInput,
	type TInput,
	type TSelectOption
} from './inputs.js'
import { type TAssetEnhancement } from '../assets/enhancement.js'
import { type TMoveEnhancement } from '../moves.js'

export const EnhanceableProperties = Symbol('EnhanceableProperties')

/** The standard discriminator key for input fields. */
export const DISCRIMINATOR = 'field_type' as const

function InputField<T extends TInput<TSchema>, Discriminator extends string>(
	base: T,
	discriminator: Discriminator,
	id: TRef<TString>,
	options: ObjectOptions = {}
) {
	const mixin = Type.Object({
		id,
		[DISCRIMINATOR]: Type.Literal(discriminator)
	})
	// @ts-expect-error
	return Type.Composite([mixin, base], {
		description: base.description,
		$comment: base.$comment,
		[EnhanceableProperties]: [] as Array<keyof Static<T>>,
		...options
	}) as TInputField<T, Discriminator>
}
export type TInputField<
	T extends TInput<TSchema>,
	Discriminator extends string
> = TObject<
	{
		id: TRef<TString>
		[DISCRIMINATOR]: TLiteral<Discriminator>
	} & ObjectProperties<T>
> & { [EnhanceableProperties]: Array<keyof Static<T>> }

// ReturnType<typeof InputField<T, Discriminator>> & InputFieldOptions<T>

export type InputField<T extends Input<any>, Discriminator extends string> = {
	id: string
	[DISCRIMINATOR]: Discriminator
} & T

export function isEnhanceable(field: TInputField<TInput<TSchema>, string>) {
	return !!field[EnhanceableProperties].length
}

export function CounterField(id: TRef<TString>) {
	return InputField(Counter, 'counter', id, {
		[EnhanceableProperties]: ['max']
	})
}
export type TCounterField = ReturnType<typeof CounterField>
export type CounterField = Static<TCounterField>

export function ClockField(id: TRef<TString>) {
	return InputField(Clock, 'clock', id, { [EnhanceableProperties]: ['max'] })
}
export type TClockField = ReturnType<typeof ClockField>
export type ClockField = Static<TClockField>

export function ConditionMeterField(id: TRef<TString>) {
	return InputField(Meter(LiteralZero, Type.Integer()), 'condition_meter', id, {
		[EnhanceableProperties]: ['max']
	})
}
export type TConditionMeterField = ReturnType<typeof ConditionMeterField>
export type ConditionMeterField = Static<TConditionMeterField>

function SelectField<
	Option extends TSelectOption<TSchema>,
	Discriminator extends string
>(
	optionSchema: Option,
	discriminator: Discriminator,
	id: TRef<TString>,
	options: ObjectOptions = {}
) {
	return InputField(Select(optionSchema), discriminator, id, options)
}

export function SelectStatField(
	id: TRef<TString>,
	options: ObjectOptions = {}
) {
	return SelectField(
		SelectOption(Type.Ref(Player.PlayerStat)),
		'select_stat',
		id,
		options
	)
}
export type TSelectStatField = ReturnType<typeof SelectStatField>
export type SelectStatField = Static<TSelectStatField>

export function SelectEnhancementField(
	id: TRef<TString>,
	options: ObjectOptions = {}
) {
	return SelectField(
		SelectOption(
			Type.Partial(
				Type.Object({
					enhance_asset: Type.Ref<TAssetEnhancement>(
						'#/$defs/AssetEnhancement'
					),
					// TODO
					// enhance_player: Type.Object({}, { description: 'NYI' }),
					enhance_moves: Type.Array(
						Type.Ref<TMoveEnhancement>('#/$defs/MoveEnhancement')
					)
				})
			)
		),
		'select_enhancement',
		id,
		{
			description:
				'Select from player and/or asset enhancements. Use it to describe modal abilities. For examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).',
			...options
		}
	)
}
export type TSelectEnhancementField = ReturnType<typeof SelectEnhancementField>
export type SelectEnhancementField = Static<TSelectEnhancementField>

export function CardFlipField(id: TRef<TString>, options: ObjectOptions = {}) {
	return InputField(
		Input(
			Type.Boolean({ description: 'Is the card flipped over?', default: false })
		),
		'card_flip',
		id,
		{
			description: `When its value is set to \`true\` it means that the card is flipped over. Some assets use this to represent a 'broken' state (e.g. Starforged Module assets).`,
			...options
		}
	)
}
export type TCardFlipField = ReturnType<typeof CardFlipField>
export type CardFlipField = Static<TCardFlipField>

export function CheckboxField(id: TRef<TString>, options: ObjectOptions = {}) {
	return InputField(Checkbox, 'checkbox', id, options)
}
export type TCheckboxField = ReturnType<typeof CheckboxField>
export type CheckboxField = Static<TCheckboxField>

export function TextField(id: TRef<TString>, options: ObjectOptions = {}) {
	return InputField(TextInput, 'text', id, options)
}
export type TTextField = ReturnType<typeof TextField>
export type TextField = Static<TTextField>
