import type * as Id from '../common/Id.js'
import * as Utils from '../Utils.js'

import { type TObject, type ObjectOptions, Type } from '@sinclair/typebox'
import { setDescriptions } from '../utils/typebox.js'

export function IdentifiedNode<T extends TObject>(
	id: Id.AnyID,
	schema: T,
	options: ObjectOptions = {}
) {
	// console.log('BASE', schema)
	// const result =
	// 	// @ts-expect-error
	// 	Type.Object(
	// 		{ id: ComputedProperty(id), ...TypeClone.Type(schema).properties },
	// 		options
	// 	) as TIdentifiedNode<T>
	// console.log('ADDED ID', result)
	const { description, $comment } = schema

	const result = Utils.Assign(
		[Type.Object({ id: Utils.Computed(id) }), schema],
		{
			description,
			$comment,
			...options
		}
	)

	return setDescriptions(result, {
		id: 'The unique Datasworn ID for this item.'
	}) satisfies TIdentifiedNode<T>
}

export type TIdentifiedNode<T extends TObject> = TObject<
	T['properties'] & { id: Utils.TComputed<Id.AnyID> }
>
export type IdentifiedNode<T extends object = object> = T & { id: string }
