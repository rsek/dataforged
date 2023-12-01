import { type SchemaOptions } from '@sinclair/typebox'
import { map } from 'lodash-es'
import {
	Description,
	EnumDescription,
	UnionEnum,
	type TUnionEnum
} from './UnionEnum.js'

export function UnionEnumFromRecord<K extends string>(
	entries: Record<K, string>,
	options?: SchemaOptions
): TUnionEnum<K[]>
export function UnionEnumFromRecord<T extends string[] | number[]>(
	entries: Record<T[number], string>,
	options: SchemaOptions = {}
): TUnionEnum<T> {
	const literals = Object.keys(entries).map((k) =>
		Number.isInteger(Number(k)) ? Number(k) : k
	) as T

	let description = map(
		entries,
		(description, literal) => `  - \`${literal?.toString()}\`: ${description}`
	).join('\n')

	if (options.description)
		description = options.description + '\n\n' + description

	return UnionEnum(literals, {
		[Description]: options.description,
		[EnumDescription]: entries,
		...options,
		description
	})
}
