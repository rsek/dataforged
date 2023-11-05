import {
	Type,
	type ArrayOptions,
	type ObjectOptions,
	type TAnySchema,
	type TObject,
	type TSchema,
	type TBigInt
} from '@sinclair/typebox'
import { Localize } from 'schema/common.js'
import { PartialExcept } from 'schema/common/utils.js'
import { MoveBase, TriggerBy } from './common'

export function composeTriggerRollCondition(
	optionSchema: TSchema | undefined,
	method: TSchema | undefined,
	schemaOptions: ObjectOptions = {}
) {
	const properties = {
		text: Type.Optional(
			Type.Ref(Localize.MarkdownString, {
				description:
					'A markdown string of any trigger text specific to this trigger condition.'
			})
		),
		by: Type.Optional(Type.Ref(TriggerBy))
	}

	if (optionSchema == null) return Type.Object(properties, schemaOptions)

	const roll_options = Type.Array(Type.Ref(optionSchema), {
		description: 'The options available when rolling with this trigger.'
	})
	// @ts-expect-error ugh
	return Type.Object({ ...properties, method, roll_options }, schemaOptions)
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
	return Type.Composite([Type.Omit(MoveBase, ['roll_type']), schema], options)
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
export function toTriggerConditionAugment(
	conditionSchema: TObject,
	options: ObjectOptions
) {
	return PartialExcept(conditionSchema, ['text'], options)
}
