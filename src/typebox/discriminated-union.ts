import { MapValue } from 'type-fest/source/entry.js'
import { TUnionOneOf, UnionOneOf } from './union-oneof'

import {
	TSchema,
	TLiteral,
	Hint,
	SchemaOptions,
	TObject,
	TRef,
	TUnion,
	Type,
	UnionToTuple
} from '@sinclair/typebox'
import { JsonTypeDef } from '../json-typedef/utils.js'

const DiscriminatedUnionHint = 'DiscriminatedUnion'
export const Discriminator = Symbol('Discriminator')
export const Members = Symbol('Members')

export type TDiscriminatedUnion<
	D extends string = string,
	T extends TDiscriminated<D>[] = TDiscriminated<D>[]
> = TUnionOneOf<[...TRef<T[number]>[]]> & {
	static: TUnion<T>['static']
	[Hint]: typeof DiscriminatedUnionHint
	[Discriminator]: D
	[Members]: T
}

export function TDiscriminatedUnion(
	schema: unknown
): schema is TDiscriminatedUnion {
	return (schema as TDiscriminatedUnion)[Hint] === DiscriminatedUnionHint
}

export type TDiscriminated<Discriminator extends string> = TObject<{
	[K in Discriminator]: TLiteral<string>
}> & { [JsonTypeDef]?: { skip?: boolean } }

/**
 * @remarks oneOf schemas should be referenceable.
 */
export function DiscriminatedUnion<
	D extends string,
	T extends TDiscriminated<D>[]
>(discriminator: D, oneOf: [...T], options: SchemaOptions = {}) {
	const result = UnionOneOf(
		oneOf.map((item) => Type.Ref(item)),
		options
	) as TDiscriminatedUnion<D, T>

	// brand the original subschema so that JTD schema generation skips them -- they don't need their own definition
	for (const subschema of oneOf) {
		subschema[JsonTypeDef] ||= {}
		subschema[JsonTypeDef].skip = true
	}

	result[Hint] = DiscriminatedUnionHint
	result[Discriminator] = discriminator
	// so that JTD can reconstruct them into a single object later
	result[Members] = oneOf

	return result
}
