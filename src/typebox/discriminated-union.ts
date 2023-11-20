import { JsonTypeDef } from '../json-typedef/symbol.js'
import { type TUnionOneOf, UnionOneOf } from './union-oneof.js'
import {
	Hint,
	type SchemaOptions,
	type TLiteral,
	type TObject,
	type TRef,
	type TUnion,
	Type
} from '@sinclair/typebox'

const DiscriminatedUnionHint = 'DiscriminatedUnion'
export const Discriminator = Symbol('Discriminator')
export const Members = Symbol('Members')

export type TDiscriminatedUnion<
	D extends string = string,
	T extends Array<TDiscriminated<D>> = Array<TDiscriminated<D>>
> = TUnionOneOf<[...Array<TRef<T[number]>>]> & {
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
 * A oneOf union schema that converts to a JTD-friendly Discriminator form (AKA tagged union).
 */
export function DiscriminatedUnion<
	D extends string,
	T extends Array<TDiscriminated<D>>
>(discriminator: D, oneOf: [...T], options: SchemaOptions = {}) {
	const result = UnionOneOf(
		oneOf.map((item) => (item.$id == null ? item : Type.Ref(item))),
		options
	) as TDiscriminatedUnion<D, T>

	for (const subschema of oneOf) {
		if (subschema.$id == null) continue
		// brand the original subschema so that JTD schema generation skips them -- they won't need their own definition
		subschema[JsonTypeDef] ||= {}
		subschema[JsonTypeDef].skip = true
		// hint the type name for JTD, so it's consistent with the schema
		subschema.title = subschema.$id.replace('#/$defs/', '')
	}

	result[Hint] = DiscriminatedUnionHint
	result[Discriminator] = discriminator
	// so that JTD can reconstruct them into a single object later
	result[Members] = oneOf

	return result
}
