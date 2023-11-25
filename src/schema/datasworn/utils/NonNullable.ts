import { type TNullable } from './Nullable.js'

export function NonNullable<T extends TNullable>(base: T) {
	const [schema] = base.anyOf
	return schema
}
