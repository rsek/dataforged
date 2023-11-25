import {
	Kind,
	Type,
	TypeClone,
	type SchemaOptions,
	type Static,
	type TLiteral,
	type TObject,
	type TPick,
	type TSchema,
	type TUnion
} from '@sinclair/typebox'
import { pick } from 'lodash-es'
import {
	Discriminator,
	Members,
	JsonTypeDef
} from '../../../json-typedef/symbol.js'

const DiscriminatedUnionHint = 'DiscriminatedUnion'

export type TDiscriminable<Discriminator extends string = string> = TObject<{
	[K in Discriminator]: TLiteral<string>
}>

export type TDiscriminated<
	Discriminator extends string = string,
	T extends TDiscriminable<Discriminator> = TDiscriminable<Discriminator>
> = T & { [JsonTypeDef]?: { skip?: boolean } }

export function DiscriminatedUnion<
	D extends string,
	T extends Array<TDiscriminated<D>>
>(discriminator: D, members: [...T], options: SchemaOptions = {}) {
	const allOf = members.map((member) => {
		const result = {
			if: Type.Unsafe({
				properties: pick(member.properties, discriminator)
			}),
			then: member.$id == null ? TypeClone.Type(member) : Type.Ref(member)
		}

		// if (member.$id != null) {
		// brand the original member so that JTD schema generation skips them -- they won't need their own definition
		;(member as any)[JsonTypeDef] ||= {}
		;(member as any)[JsonTypeDef].skip = true
		// }

		return result
	}) as any

	const properties = {
		[discriminator]: {
			enum: members.map((member) => member.properties[discriminator].const)
		}
	} as TDiscriminatedUnion<D, T>['properties']

	const result: TDiscriminatedUnion<D, T> = {
		...options,
		type: 'object',
		params: undefined as any,
		allOf,
		required: [discriminator],
		static: undefined as any,
		additionalProperties: true,
		properties,
		[Kind]: DiscriminatedUnionHint,
		[Discriminator]: discriminator,
		[Members]: members
	}

	return result
}

export function TDiscriminatedUnion(
	schema: unknown
): schema is TDiscriminatedUnion {
	return (schema as TDiscriminatedUnion)[Kind] === DiscriminatedUnionHint
}

export interface TDiscriminatedUnion<
	D extends string = string,
	T extends Array<TDiscriminated<D>> = Array<TDiscriminated<D>>
> extends TSchema {
	type: 'object'
	static: Static<TUnion<T>>
	properties: {
		[P in D]: { enum: Array<Static<TDiscriminatorValue<T[number]>>> }
	}
	allOf: Array<{
		if: TObject<{ [P in D]: TPick<T[number], D> }>
		then: T[number]
	}>
	additionalProperties: true
	[Kind]: typeof DiscriminatedUnionHint
	[Discriminator]: D
	[Members]: [...T]
}

type DiscriminatorKey<T extends TDiscriminated<string>> =
	T extends TDiscriminated<infer D> ? D & keyof Static<T> : never

type TDiscriminatorValue<T extends TDiscriminated<string>> =
	T['properties'][DiscriminatorKey<T>]

//   export type TDiscriminatedUnion<
// 	D extends string = string,
// 	T extends Array<TDiscriminated<D>> = Array<TDiscriminated<D>>
// > = TUnionOneOf<[...Array<TRef<T[number]>>]> & {
// 	static: TUnion<T>['static']
// 	[Hint]: typeof DiscriminatedUnionHint
// 	[Discriminator]: D
// 	[Members]: [...T]
// }

// export function TDiscriminatedUnion(
// 	schema: unknown
// ): schema is TDiscriminatedUnion {
// 	return (schema as TDiscriminatedUnion)[Hint] === DiscriminatedUnionHint
// }

/**
 * A oneOf union schema that converts to a JTD-friendly Discriminator form (AKA tagged union).
 */
// export function DiscriminatedUnion<
// 	D extends string,
// 	T extends Array<TDiscriminated<D>>
// >(discriminator: D, oneOf: [...T], options: SchemaOptions = {}) {
// 	const result = UnionOneOf(
// 		oneOf.map((item) =>
// 			item.$id == null ? TypeClone.Type(item) : Type.Ref(item)
// 		),
// 		options
// 	) as TDiscriminatedUnion<D, T>

// 	// for (const subschema of oneOf) {
// 	// 	if (subschema.$id == null) continue
// 	// 	subschema.title = subschema.$id.split('/').pop()
// 	// 	delete subschema.$id
// 	// }

// 	result[Hint] = DiscriminatedUnionHint
// 	result[Discriminator] = discriminator
// 	// so that JTD can reconstruct them into a single object later
// 	result[Members] = oneOf as any

// 	return result
// }
