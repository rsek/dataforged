import {
	Kind,
	type TRef,
	Type,
	TypeClone,
	TypeRegistry,
	type SchemaOptions,
	type Static,
	type TObject,
	type TPick,
	type TSchema
} from '@sinclair/typebox'
import {
	Discriminator,
	JsonTypeDef,
	Members
} from '../../../scripts/json-typedef/symbol.js'
import { type TUnionEnum, UnionEnum } from './UnionEnum.js'
import { pick } from 'lodash-es'

export function DiscriminatedUnion<
	T extends TObject[],
	TDiscriminator extends string & keyof Static<T[number]>
>(schemas: [...T], discriminator: TDiscriminator, options: SchemaOptions = {}) {
	if (!TypeRegistry.Has('DiscriminatedUnion'))
		TypeRegistry.Set('DiscriminatedUnion', DiscriminatedUnionCheck)

	const allOf = schemas.map((member) => {
		const result = {
			if: pick(
				Type.Pick(member, [discriminator]),
				`properties.${discriminator}.const`,
				`properties.${discriminator}.type`
			),
			// if: Type.Unsafe<Static<(typeof member)['properties'][D]>>({
			// 	properties: pick(member.properties, discriminator)
			// }),
			then:
				member.$id == null
					? TypeClone.Type(member, { additionalProperties: false })
					: Type.Ref(member)
		}

		// brand the original member so that JTD schema generation skips them -- they won't need their own definition
		;(member as any)[JsonTypeDef] ||= {}
		;(member as any)[JsonTypeDef].skip = true

		return result
	}) as TDiscriminatedUnion<T, TDiscriminator>['anyOf']

	type DiscriminatorValueLiteral = Static<T[number]>[TDiscriminator] & string

	const literals = UnionEnum(
		schemas.map(
			(member) => member.properties[discriminator].const
		) as DiscriminatorValueLiteral[]
	)

	const properties = { [discriminator]: literals } as Record<
		TDiscriminator,
		typeof literals
	>

	const result = {
		...options,
		type: 'object',
		params: undefined as any,
		static: undefined as any,
		allOf,
		required: [discriminator],
		additionalProperties: true,
		properties,
		[Kind]: 'DiscriminatedUnion',
		[Discriminator]: discriminator,
		[Members]: schemas
	}

	return result as TDiscriminatedUnion<T, TDiscriminator>
}

function DiscriminatedUnionCheck(
	schema: TDiscriminatedUnion<TObject[], string>,
	value: unknown
) {
	const discriminator = schema[Discriminator]
	// const members = schema[Members]
	const mapping = schema.properties[discriminator].enum

	// const memberSchema = UnionOneOf(members)
	// const memberValidator = Value.Check()

	return (value as any[]).every((item) => mapping.includes(item[discriminator]))
}


export function TDiscriminatedUnion<
	T extends TDiscriminatedUnion<TObject[], string> = TDiscriminatedUnion<
		TObject[],
		string
	>
>(schema: unknown): schema is T {
	return (schema as T)[Kind] === 'DiscriminatedUnion'
}

export interface TDiscriminatedUnion<
	T extends TObject[],
	TDiscriminator extends string & keyof Static<T[number]>
> extends TSchema {
	type: 'object'
	static: Static<T[number]>
	properties: Record<
		TDiscriminator,
		TUnionEnum<(Static<T[number]>[TDiscriminator] & string)[]>
	>
	allOf: {
		if: TPick<T[number], TDiscriminator>
		then: T[number] | TRef<T[number]>
	}[]
	additionalProperties: true
	[Kind]: 'DiscriminatedUnion'
	[Discriminator]: TDiscriminator
	[Members]: [...T]
}


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
