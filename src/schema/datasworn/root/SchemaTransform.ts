import {
	TypeClone,
	type SchemaOptions,
	type TSchema,
	type TArray,
	type TBoolean,
	type TInteger,
	type TIntersect,
	type TLiteral,
	type TNull,
	type TNumber,
	type TObject,
	type TRecord,
	type TRef,
	type TString,
	type TTuple,
	type TUnion
} from '@sinclair/typebox'
import { type TUnionEnum } from '../utils/UnionEnum.js'
import { type TUnionOneOf } from '../utils/UnionOneOf.js'
import { type TDiscriminatedUnion } from '../utils/DiscriminatedUnion.js'

export const SchemaKind = [
	'Array',
	'Boolean',
	'Integer',
	'Intersect',
	'Literal',
	'Null',
	'Number',
	'Object',
	'Record',
	'Ref',
	'String',
	'Tuple',
	'Union',
	// custom types
	'UnionOneOf',
	'UnionEnum',
	'DiscriminatedUnion'
] as const

interface SchemaKindMap extends Record<SchemaKind, TSchema> {
	Array: TArray
	Boolean: TBoolean
	Integer: TInteger
	Intersect: TIntersect
	Literal: TLiteral
	Null: TNull
	Number: TNumber
	Object: TObject
	Record: TRecord
	Ref: TRef
	String: TString
	Tuple: TTuple
	Union: TUnion
	UnionOneOf: TUnionOneOf<TSchema[]>
	UnionEnum: TUnionEnum
	DiscriminatedUnion: TDiscriminatedUnion
}

export type SchemaKind = (typeof SchemaKind)[number]

export type SchemaTransform<T> = (schema: T, options: SchemaOptions) => T

export type SchemaTransforms = {
	[P in SchemaKind]: SchemaTransform<SchemaKindMap[P]>
}

export const SchemaTransforms = Object.fromEntries(
	SchemaKind.map((kind) => [
		kind,
		(schema: SchemaKindMap[typeof kind], options: SchemaOptions) =>
			TypeClone.Type(schema, options)
	])
) as SchemaTransforms
