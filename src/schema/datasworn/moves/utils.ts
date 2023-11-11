import {
	Static,
	TArray,
	TLiteral,
	TNull,
	TUnion,
	Type,
	type ArrayOptions,
	type ObjectOptions,
	type TAnySchema,
	type TBigInt,
	type TObject,
	type TSchema
} from '@sinclair/typebox'
import { SourcedNode } from '../common/abstract.js'
import { MoveIDWildcard } from '../common/id.js'
import { Abstract, ID, Localize, Metadata } from '../common/index.js'
import { RequireBy } from '../common/utils.js'
import {
	MoveOutcomes,
	MoveRollType,
	TriggerBy,
	type AnyMoveSchema
} from './common.js'

export const MoveBase = Type.Object({
	id: Type.Ref(ID.MoveID),
	name: Type.Ref(Localize.Label),
	// is_progress_move: Type.Boolean({ default: false }),
	roll_type: Type.Ref(MoveRollType),
	replaces: Type.Optional(
		Type.Ref(ID.MoveID, {
			description:
				'Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.'
		})
	),
	trigger: Type.Object({
		text: Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#conditions.',
			type: 'string'
		})
	}),
	text: Type.Ref(Localize.MarkdownString, {
		description: 'The complete rules text of the move.'
	}),
	outcomes: Type.Optional(Type.Ref(MoveOutcomes)),
	oracles: Type.Optional(
		Type.Array(Type.Ref(ID.OracleTableID), {
			description:
				"Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement."
		})
	),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	source: Type.Ref(Metadata.Source)
})

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
		Type.Composite([
			Type.Omit(MoveBase, ['roll_type', 'outcomes', 'trigger']),
			schema
		]),
		options
	)
}

export function toTriggerEnhance(
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

type TriggerConditionEnhanceSchema<
	Option extends TSchema | undefined,
	Method extends TSchema | undefined
> = TObject<
	Option extends TSchema
		? Method extends TSchema
			? typeof TriggerRollConditionProperties & {
					method: TUnion<[Method, TLiteral<'enhance'>]>
					options: TUnion<[TArray<Option>, TNull]>
			  }
			: typeof TriggerRollConditionProperties
		: typeof TriggerRollConditionProperties
>

export function toTriggerConditionEnhance<
	RollOption extends TSchema | undefined,
	Method extends TSchema | undefined
>(
	base: ReturnType<typeof composeTriggerRollCondition<RollOption, Method>>,
	options: ObjectOptions
): TriggerConditionEnhanceSchema<RollOption, Method> {
	const optionsSchema = (base.properties as any)
		.roll_options as RollOption extends TSchema ? TArray<RollOption> : undefined
	const method = (base.properties as any).method as Method

	if (optionsSchema == null || method == null)
		return Type.Object(TriggerRollConditionProperties, options) as any

	const enhanceLiteral = 'enhance'

	return Type.Object(
		{
			...TriggerRollConditionProperties,
			method: Type.Union([Type.Literal(enhanceLiteral), method], {
				default: enhanceLiteral,
				description:
					'If this is null or undefined, this trigger condition enhance specifies no roll method of its own.'
			}),
			roll_options: Type.Union([Type.Null(), optionsSchema], {
				default: null,
				description:
					'If this is null or undefined, this trigger condition enhance specifies no roll options of its own.'
			})
		},
		options
	) as any
}

export function toMoveEnhance<
	TMove extends AnyMoveSchema & TObject,
	TEnhance extends TObject
>(
	moveSchema: TMove,
	triggerEnhanceSchema: TEnhance,
	options: ObjectOptions = {}
) {
	const { roll_type } = moveSchema.properties
	const base = Type.Object({
		roll_type,
		trigger: Type.Optional(triggerEnhanceSchema)
	})

	const enhanceMany = RequireBy(
		Abstract.EnhanceMany(base, Type.Ref(MoveIDWildcard), options),
		['roll_type'],
		options
	)

	return enhanceMany
}

export type MoveBase = Static<typeof MoveBase>
