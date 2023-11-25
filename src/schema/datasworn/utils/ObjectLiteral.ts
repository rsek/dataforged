import { Type, type TLiteralValue } from '@sinclair/typebox'
import { mapValues } from 'lodash-es'

/** Transform an object of literal values into a schema representing the object. */

export function ObjectLiteral<T extends Record<string, TLiteralValue>>(
	object: T
) {
	return Type.Object(mapValues(object, (v) => Type.Literal(v)))
}
/** Extracts all properties that can be rendered as Type.Literal with typebox */
export type CanBeLiteral<T> = {
	[K in keyof T as Required<T>[K] extends TLiteralValue | null | undefined
		? K
		: never]: Exclude<T[K], null | undefined>
}
