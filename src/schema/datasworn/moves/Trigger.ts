import {
	Type,
	TypeGuard,
	type ObjectOptions,
	type Static,
	type TArray,
	type TNull,
	type TSchema
} from '@sinclair/typebox'
import { type TJsonEnum } from '../../../typebox/enum.js'
import { Localize } from '../common/index.js'
import {
	Merge,
	Nullable,
	TNullable,
	type TFuzzyNull,
	type TFuzzyObject,
	type TFuzzyRef
} from '../utils/typebox.js'

export const TriggerBy = Type.Object(
	{
		player: Type.Boolean({ default: true }),
		ally: Type.Boolean({ default: false })
	},
	{
		$id: '#/$defs/TriggerBy',
		description:
			"Information on who can trigger this trigger condition. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	}
)
export type TriggerBy = Static<typeof TriggerBy>

const TriggerConditionBase = Type.Object({
	text: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string of any trigger text specific to this trigger condition.'
		})
	),
	by: Type.Optional(Type.Ref(TriggerBy))
})

export function TriggerCondition<
	Method extends TFuzzyNull<TJsonEnum<string[]>>,
	RollOptions extends TFuzzyNull<TArray<TFuzzyObject<{ using: TSchema }>>>
>(method: Method, rollOptions: RollOptions, options: ObjectOptions = {}) {
	const roll_options: RollOptions = {
		description: 'The options available when rolling with this trigger.',
		...rollOptions
	}
	return Merge(
		TriggerConditionBase,
		Type.Object({
			method,
			roll_options
		}),
		options
	)
}
export type TTriggerCondition<
	Method extends TFuzzyNull<TJsonEnum<string[]>> = TFuzzyNull<
		TJsonEnum<string[]>
	>,
	RollOptions extends TFuzzyNull<
		TArray<TFuzzyObject<{ using: TSchema }>>
	> = TFuzzyNull<TArray<TFuzzyObject<{ using: TSchema }>>>
> = ReturnType<typeof TriggerCondition<Method, RollOptions>>

export function TriggerConditionEnhancement<T extends TTriggerCondition>(
	triggerCondition: T,
	options: ObjectOptions
) {
	const RollOptions = triggerCondition.properties.roll_options
	type RollOptions = typeof RollOptions

	const Method = triggerCondition.properties.method
	type Method = T['properties']['method']

	type TNullableRollOptions = Omit<
		T['properties'],
		'roll_options' | 'method'
	> & {
		roll_options: RollOptions extends TNull | TNullable
			? RollOptions
			: TNullable<RollOptions>
		method: Method extends TNull | TNullable ? Method : TNullable<Method>
	}

	const rollOptionsAreNullable = TypeGuard.TNull(Method) ?? TNullable

	const roll_options = rollOptionsAreNullable
		? RollOptions
		: Nullable(RollOptions)

	const methodIsNullable = TypeGuard.TNull(Method) ?? TNullable(Method)

	const method = methodIsNullable
		? Method
		: Nullable(Method, {
				description:
					'A `null` value means this condition provides no roll mechanic of its own; it must be used with another trigger condition that provides a non-null `method`.'
		  })

	const nuProps = {
		...triggerCondition.properties,
		roll_options,
		method
	} as TNullableRollOptions

	return Type.Object(nuProps, options)
}

const TriggerMixin = Type.Object({
	text: Type.Ref(Localize.MarkdownString, {
		description:
			'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.',
		type: 'string',
		pattern: /.*\.{3}/.source
	})
})

export function Trigger<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>>
>(conditions: T, options: ObjectOptions = {}) {
	return Merge(TriggerMixin, Type.Object({ conditions }), options)
}
export type TTrigger<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>> = TFuzzyNull<
		TArray<TFuzzyRef<TTriggerCondition>>
	>
> = ReturnType<typeof Trigger<T>>

export function TriggerEnhancement<T extends TTrigger>(
	conditionSchema: TFuzzyRef<T>,
	options: ObjectOptions
) {
	return Type.Object(
		{
			conditions: Type.Array(conditionSchema)
		},
		options
	)
}
