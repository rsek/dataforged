import { TypeClone } from '@sinclair/typebox'
import { type TNullable } from './Nullable.js'

export function NonNullable<T extends TNullable>(base: T) {
	return TypeClone.Type(base.anyOf[0])
}
