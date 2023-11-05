import { Type, type ObjectOptions, type TObject } from '@sinclair/typebox'
import { Abstract } from 'schema/common.js'
import { MoveIDWildcard } from 'schema/common/id.js'
import { Squash } from 'schema/common/utils.js'
import { type AnyMoveSchema } from 'schema/moves/common.js'

export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<RecursivePartial<U>>
		: T[P] extends number | string | symbol | undefined
		? T[P]
		: RecursivePartial<T[P]>
}
export function toMoveAugment<
	TMove extends AnyMoveSchema,
	TAugment extends TObject
>(
	moveSchema: TMove,
	triggerAugmentSchema: TAugment,
	options: ObjectOptions = {}
) {
	const toSquash: TObject[] = []

	// FIXME: revisit whether augments should include text (because the asset ability text *does* already exist)
	// toSquash.push(Type.Pick(moveSchema, ['text']))
	toSquash.push(Type.Pick(moveSchema, ['roll_type', 'id']))

	toSquash.push(
		Type.Object({
			trigger: Type.Optional(triggerAugmentSchema)
		})
	)

	const combined = Squash(toSquash)

	const augmentMany = Abstract.AugmentMany(
		combined,
		Type.Ref(MoveIDWildcard),
		options
	)

	augmentMany.required = [...(augmentMany.required ?? []), 'roll_type']

	// FIXME: revisit whether augments should include outcome-specific stuff
	// if ('outcomes' in moveSchema.properties)
	// 	return Squash(
	// 		[
	// 			augmentMany,
	// 			Type.Object({
	// 				outcomes: Type.Optional(Type.Ref(MoveOutcomesAugment))
	// 			})
	// 		],
	// 		options
	// 	)
	return augmentMany
}
