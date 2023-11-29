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
	type TSchema,
	TypeGuard
} from '@sinclair/typebox'
import {
	Discriminator,
	JsonTypeDef,
	Members
} from '../../../scripts/json-typedef/symbol.js'
import { type TUnionEnum, UnionEnum } from './UnionEnum.js'
import { mapValues, omit, pick } from 'lodash-es'

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

	const oneOf = schemas.map((member) => {
		const result =
			member.$id == null
				? TypeClone.Type(member, { additionalProperties: false })
				: Type.Ref(member)

		// brand the original member so that JTD schema generation skips them -- they won't need their own definition
		;(member as any)[JsonTypeDef] ||= {}
		;(member as any)[JsonTypeDef].skip = true

		return result
	})

	type DiscriminatorValueLiteral = Static<T[number]>[TDiscriminator] & string

	const literals = UnionEnum(
		schemas.map(
			(member) => member.properties[discriminator].const
		) as DiscriminatorValueLiteral[]
	)
	// const literals = Type.Enum(
	// 	Object.fromEntries(
	// 		schemas.map((member) => [
	// 			member.properties[discriminator].const,
	// 			member.properties[discriminator].const
	// 		])
	// 	)
	// )

	const properties = { [discriminator]: literals } as Record<
		TDiscriminator,
		typeof literals
	>

	const result = {
		...options,
		type: 'object',
		params: undefined as any,
		static: undefined as any,
		tsType: schemas
			.map((schema) =>
				schema.$id ? schema.$id.replace('#/$defs/', '') : schema.title
			)
			.join(' | '),
		allOf,
		// oneOf,
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
	oneOf: (T[number] | TRef<T[number]>)[]
	additionalProperties: true
	[Kind]: 'DiscriminatedUnion'
	[Discriminator]: TDiscriminator
	[Members]: [...T]
}

export function ToUnion<T extends TObject[]>(
	schema: TDiscriminatedUnion<T, string>
) {
	const base = omit(TypeClone.Type(schema), [
		'type',
		'allOf',
		'additionalProperties',
		'oneOf',
		Kind,
		Discriminator,
		Members
	])

	const anyOf = schema.allOf.map((item) => {
		const subschema = item.then

		switch (true) {
			case TypeGuard.TObject(subschema):
				break

			default:
				break
		}

		return subschema
	})

	return Type.Union(anyOf, base)
}
