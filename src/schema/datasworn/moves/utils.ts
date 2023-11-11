import {
	TArray,
	TNull,
	TUnion,
	Type,
	type ArrayOptions,
	type ObjectOptions,
	type TAnySchema,
	type TBigInt,
	type TObject,
	type TSchema,
	TLiteral
} from '@sinclair/typebox'
import { SourcedNode } from '../common/abstract.js'
import { MoveIDWildcard } from '../common/id.js'
import { Abstract, Localize } from '../common/index.js'
import { RequireBy } from '../common/utils.js'
import { MoveBase, TriggerBy, type AnyMoveSchema } from './common.js'

const TriggerRollConditionProperties = {
	text: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string of any trigger text specific to this trigger condition.'
		})
	),
	by: Type.Optional(Type.Ref(TriggerBy))
}

type TriggerRollConditionSchema<
	RollOption extends TSchema | undefined = undefined,
	Method extends TSchema | undefined = undefined
> = TObject<
	RollOption extends TSchema
		? Method extends TSchema
			? typeof TriggerRollConditionProperties & {
					method: Method
					options: TArray<RollOption>
			  }
			: typeof TriggerRollConditionProperties
		: typeof TriggerRollConditionProperties
>

// export function composeTriggerRollCondition<
// 	Option extends TSchema,
// 	Method extends TSchema
// >(
// 	{
// 		optionSchema,
// 		methodSchema
// 	}: { optionSchema: Option; methodSchema: Method },
// 	schemaOptions?: ObjectOptions
// ): TObject<
// 	typeof TriggerRollConditionProperties & {
// 		method: Method
// 		options: TArray<Option>
// 	}
// >
// export function composeTriggerRollCondition<
// 	Option extends undefined,
// 	Method extends undefined
// >(
// 	{
// 		optionSchema,
// 		methodSchema
// 	}: { optionSchema?: undefined; methodSchema?: undefined },
// 	schemaOptions?: ObjectOptions
// ): TObject<typeof TriggerRollConditionProperties>
export function composeTriggerRollCondition<
	RollOption extends TSchema | undefined,
	Method extends TSchema | undefined
>(
	{ optionSchema, method }: { optionSchema?: RollOption; method?: Method } = {},
	schemaOptions: ObjectOptions = {}
): TriggerRollConditionSchema<RollOption, Method> {
	if (optionSchema == null)
		return Type.Object(
			TriggerRollConditionProperties,
			schemaOptions
		) as TriggerRollConditionSchema<RollOption, Method>

	const roll_options = Type.Array(optionSchema, {
		description: 'The options available when rolling with this trigger.'
	})

	const nuProps = {
		...TriggerRollConditionProperties,
		method,
		roll_options
	}

	// @ts-expect-error ugh
	return Type.Object(nuProps, schemaOptions) as TriggerRollConditionSchema<
		RollOption,
		Method
	>
}

export function composeTrigger(
	rollConditionSchema: TObject,
	options: ObjectOptions = {},
	conditionsOptions: ArrayOptions = {}
) {
	return Type.Object(
		{
			text: Type.Ref(Localize.MarkdownString, {
				description:
					'A markdown string of the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be available for individual trigger conditions.',
				type: 'string',
				pattern: /.*\.{3}/.source
			}),
			conditions: Type.Array(Type.Ref(rollConditionSchema), {
				...conditionsOptions
			})
		},
		options
	)
}
export function composeMoveType<T extends TObject>(schema: T, options = {}) {
	return SourcedNode(
		Type.Composite([Type.Omit(MoveBase, ['roll_type']), schema], options)
	)
}

export function toTriggerAugment(
	conditionSchema: Exclude<TAnySchema, TBigInt>,
	options: ObjectOptions
) {
	return Type.Object(
		{
			conditions: Type.Array(conditionSchema)
		},
		options
	)
}

type TriggerConditionAugmentSchema<
	Option extends TSchema | undefined,
	Method extends TSchema | undefined
> = TObject<
	Option extends TSchema
		? Method extends TSchema
			? typeof TriggerRollConditionProperties & {
					method: TUnion<[Method, TLiteral<'augment'>]>
					options: TUnion<[TArray<Option>, TNull]>
			  }
			: typeof TriggerRollConditionProperties
		: typeof TriggerRollConditionProperties
>

export function toTriggerConditionAugment<
	RollOption extends TSchema | undefined,
	Method extends TSchema | undefined
>(
	base: ReturnType<typeof composeTriggerRollCondition<RollOption, Method>>,
	options: ObjectOptions
): TriggerConditionAugmentSchema<RollOption, Method> {
	const optionsSchema = (base.properties as any)
		.roll_options as RollOption extends TSchema ? TArray<RollOption> : undefined
	const method = (base.properties as any).method as Method

	if (optionsSchema == null || method == null)
		return Type.Object(TriggerRollConditionProperties, options) as any

	const augmentLiteral = 'augment'

	return Type.Object(
		{
			...TriggerRollConditionProperties,
			method: Type.Union([Type.Literal(augmentLiteral), method], {
				default: augmentLiteral,
				description:
					'If this is null or undefined, this trigger condition augment specifies no roll method of its own.'
			}),
			roll_options: Type.Union([Type.Null(), optionsSchema], {
				default: null,
				description:
					'If this is null or undefined, this trigger condition augment specifies no roll options of its own.'
			})
		},
		options
	) as any
}

export function toMoveAugment<
	TMove extends AnyMoveSchema & TObject,
	TAugment extends TObject
>(
	moveSchema: TMove,
	triggerAugmentSchema: TAugment,
	options: ObjectOptions = {}
) {
	const { roll_type } = moveSchema.properties
	const base = Type.Object({
		roll_type,
		trigger: Type.Optional(triggerAugmentSchema)
	})

	const augmentMany = RequireBy(
		Abstract.AugmentMany(base, Type.Ref(MoveIDWildcard), options),
		['roll_type'],
		options
	)

	return augmentMany
}
