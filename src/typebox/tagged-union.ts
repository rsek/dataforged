import {
	Kind,
	type TObject,
	type Static,
	type TSchema,
	type ObjectOptions,
	Type,
	type TProperties,
	TRef
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { type JSONSchema7 } from 'json-schema'
import { type ExtractKeysOfValueType } from 'schema/common/utils'
import { type JsonEnum } from 'typebox'

TypeSystem.Type('TaggedUnion', TaggedUnionCheck)

function TaggedUnionCheck(
	schema: TaggedUnion<TObject[], never>,
	value: unknown
) {
	//  TODO
	return true
}

type DiscriminableKey<T extends TObject> = ExtractKeysOfValueType<
	Static<T>,
	string
> &
	string

type DiscriminatorRecord<
	T extends TObject[],
	K extends DiscriminableKey<T[number]>
> = {
	[D in Static<T[number]>[K] & string]: Static<T[number]>[K] extends D
		? Static<T[number]>
		: never
}

type DiscriminatorValue<
	T extends TObject[],
	K extends DiscriminableKey<T[number]>
> = keyof DiscriminatorRecord<T, K> & string

export interface TaggedUnion<
	T extends TObject[],
	K extends DiscriminableKey<T[number]>,
	// eslint-disable-next-line @typescript-eslint/ban-types
	S extends Record<string, TSchema> = {}
> extends TSchema {
	static: Static<T[number]>
	[Kind]: 'TaggedUnion'
	type: 'object'
	properties: S & { [P in K]: JsonEnum<Array<DiscriminatorValue<T, K>>> }
	required: K[]
	// allOf: JSONSchema7[] & {
	// 	[I in keyof T]: {
	// 		if: TObject<{ [P in K]: T[I]['properties'][P] }>
	// 		then: T[I]
	// 	}
	// }
}

export function TaggedUnion<
	T extends TObject[],
	K extends DiscriminableKey<T[number]>
>(
	members: T,
	key: K,
	discriminator: JsonEnum<Array<DiscriminatorValue<T, K>>>,
	options: ObjectOptions = {}
) {
	const result = {
		params: undefined as any,
		static: undefined as any,
		[Kind]: 'TaggedUnion',
		type: 'object',
		properties: {
			[key]: discriminator
		} as TaggedUnion<T, K>['properties'],
		required: [key],
		// allOf: discriminator.enum.map((mappingValue: string) => ({
		// 	if: Type.Object({
		// 		[key]: Type.Literal(mappingValue)
		// 	}),
		// 	then: Type.Omit(
		// 		members.find(
		// 			(member) => member.properties[key].const === mappingValue
		// 		) as TObject,
		// 		[key]
		// 	)
		// })),
		oneOf: members,
		additionalProperties: true,
		...options
	}
	return result as TaggedUnion<T, K>
}
