/**
 * Abstract interfaces and utility types that are only used internally. They are not included in the final schema.
 */
import {
	type Static,
	Type,
	type TObject,
	type TSchema,
	type TString,
	type SchemaOptions,
	type ObjectOptions,
	type TRef,
	type TBoolean,
	type TNumber,
	type TProperties,
	TLiteral
} from '@sinclair/typebox'
import * as Utils from './utils.js'
import * as Localize from './localize.js'
import * as Metadata from './metadata.js'
import type { OracleTableRow } from '../oracles.js'
import { map, mapValues } from 'lodash-es'
import { Simplify, type PartialDeep } from 'type-fest'
import { REGEX_DICT_KEY } from '../common/regex.js'
import { AnySchema } from 'ajv'

/** Pattern for keys used in dictionary objects throughout Datasworn; they double as ID fragments, so they require "snake case" (lower case letters and underscores only) */
export const DICT_KEY = Type.RegEx(RegExp(`^${REGEX_DICT_KEY.source}$`))

export function Dictionary<T extends TSchema>(
	valuesSchema: T,
	options: ObjectOptions = {}
) {
	return Type.Record(DICT_KEY, valuesSchema, {
		...options,
		$comment: 'Deserialize as a dictionary object.'
	})
}

type TransformFn<T, K, TResult> = (value: T, key: K) => TResult

type MappedKeys<T, K extends keyof T, V> = {
	[P in keyof T]: P extends K ? V : T[P]
}

export function MappedKeys<
	T extends TObject,
	Keys extends keyof Static<T>,
	Transform extends TransformFn<
		T['properties'][keyof Static<T>],
		keyof Static<T>,
		TSchema
	>
>(schema: T, keys: Keys[], fn: Transform, options: ObjectOptions = {}) {
	type MappedProps = MappedKeys<T['properties'], Keys, ReturnType<Transform>>

	const properties: Simplify<MappedProps> = mapValues<
		(typeof schema)['properties']
	>(
		schema.properties,
		<K extends Keys>(subschema: T['properties'][K], key: K) => {
			return keys.includes(key) ? fn(subschema, key) : subschema
		}
	) as any

	return Type.Object(properties, options)
}

/**
 * A rollable number range for oracle table rows. Type parameters are for for row-like objects that have a static range, such as delve features/dangers.
 * @internal
 */
export const DiceRange = Type.Object({
	low: Type.Integer({ description: 'The low end of the dice range.' }),
	high: Type.Integer({ description: 'The high end of the dice range.' })
})
export type DiceRange = Static<typeof DiceRange>

export function StaticDiceRange<Low extends number, High extends number>(
	range: { low: Low; high: High },
	options: ObjectOptions = {}
) {
	return MappedKeys(
		DiceRange,
		['low', 'high'],
		({ description }, k) => Type.Literal(range[k], { description }),
		options
	) as TObject<{
		low: TLiteral<Low>
		high: TLiteral<High>
	}>
}
export type StaticDiceRange<Low extends number, High extends number> = Static<
	ReturnType<typeof StaticDiceRange<Low, High>>
>

export const BlankDiceRange = MappedKeys(
	DiceRange,
	Object.keys(
		DiceRange.properties
	) as (keyof (typeof DiceRange)['properties'])[],
	() => Type.Null(),
	{}
)
export type BlankDiceRange = Static<typeof BlankDiceRange>

export function toDefaultsStub<T extends Static<TObject>>(object: T) {
	return mapValues(object, (v) => Type.Any({ default: v }))
}

export function toLiteralsStub<
	T extends Static<TObject<Record<string, TString | TNumber | TBoolean>>>
>(object: T) {
	return mapValues(object, (v) => Type.Literal(v))
}

/** Extracts all properties that can be rendered as Type.Literal with typebox */
type CanBeLiteral<T> = {
	[K in keyof T as Required<T>[K] extends boolean | number | string | null
		? K
		: never]: T[K]
}

export function StaticRowStub(
	literals: Partial<CanBeLiteral<OracleTableRow>> & {
		low?: number
		high?: number
	},
	defaults: PartialDeep<OracleTableRow> = {}
) {
	const result = Type.Object({
		...toLiteralsStub(literals),
		...toDefaultsStub(defaults)
	})
	return result
}

const sourcedNodeBaseProps = {
	name: Type.Ref(Localize.Label),
	canonical_name: Type.Optional(Type.Ref(Localize.Label)),
	source: Type.Ref(Metadata.Source),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions))
}

export function SourcedNode<T extends TProperties>(
	properties: T,
	options: ObjectOptions = {}
) {
	return Type.Object<typeof sourcedNodeBaseProps & T>(
		{
			...sourcedNodeBaseProps,
			...properties
		},
		options
	)
}
export type SourcedNode<T extends TProperties> = Static<
	ReturnType<typeof SourcedNode<T>>
>

export function Cyclopedia<T extends TProperties>(
	properties: T,
	options: ObjectOptions = {}
) {
	return SourcedNode(
		{
			features: Type.Array(Type.Ref(Localize.MarkdownString)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Ref(Localize.MarkdownString),
			quest_starter: Type.Ref(Localize.MarkdownString),
			your_truths: Type.Optional(Type.Ref(Localize.MarkdownString)),
			...properties
		},
		options
	)
}
export type Cyclopedia<T extends TProperties> = Static<
	ReturnType<typeof Cyclopedia<T>>
>

// type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = 'id' | 'source' | 'rendering' | 'name' | 'suggestions'

const MetaKeys = ['id', 'source', 'rendering', 'name', 'suggestions'] as const

/**
 * Omits common metadata and localization keys.
 */
export function OmitMeta<T extends TObject>(t: T) {
	return Type.Omit(t, MetaKeys)
}
export type OmitMeta<T> = Omit<T, MetaKeys>

/**
 * Augments a single rules element
 */
export function AugmentOne<T extends TObject<{ id: TString | TRef<TString> }>>(
	t: T
) {
	return Type.Composite([
		OmitMeta(t),
		Type.Object({ augments: Type.Optional(t.properties.id) })
	])
}
export type AugmentOne<T extends TObject<{ id: TString | TRef<TString> }>> =
	Static<ReturnType<typeof AugmentOne<T>>>

export function AugmentMany<T extends TObject<{ id: TString | TRef<TString> }>>(
	t: T,
	extendIds: TString | TRef<TString>,
	options: ObjectOptions = {}
) {
	return Type.Composite(
		[
			Utils.DeepPartial(OmitMeta(t)) as any,
			Type.Object({ augments: Type.Optional(Type.Array(extendIds)) })
		],
		options
	)
}
export type AugmentMany<T extends TObject<{ id: TString | TRef<TString> }>> =
	Static<ReturnType<typeof AugmentMany<T>>>

export function Collection<T extends TRef>(
	memberSchema: T,
	idPattern: TRef<TString>,
	properties: TProperties = {},
	options: SchemaOptions = {}
) {
	return SourcedNode(
		{
			id: idPattern,
			extends: Type.Optional({
				...idPattern,
				description:
					"Indicates that this collection's content enhances another collection, rather than being a standalone collection of its own."
			}),
			// FIXME: Revisist whether this is necessary
			// imports: Type.Optional(
			// 	Type.Object(
			// 		{
			// 			from: {
			// 				...idPattern,
			// 				description: 'The collection imported by this collection.'
			// 			},
			// 			include: Type.Union(
			// 				[
			// 					Type.Null(),
			// 					Type.Array(
			// 						Type.Unsafe<string>({
			// 							$ref: memberSchema.$ref + 'IDWildcard'
			// 						})
			// 					)
			// 				],
			// 				{
			// 					description:
			// 						'IDs (which may be wildcarded) for the items to import, or `null` if the entire collection should be imported.'
			// 				}
			// 			)
			// 		},
			// 		{
			// 			macro: true,
			// 			description:
			// 				"Collection borrows content from another collection. The target collection should be cloned, and this collection's values then merged to the clone as overrides."
			// 		}
			// 	)
			// ),
			color: Type.Optional(Type.Ref(Metadata.CSSColor)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			contents: Type.Optional(Dictionary(memberSchema)),
			...properties
		},
		options
	)
}

export type Collection<T> = Omit<
	Static<ReturnType<typeof Collection<TRef>>>,
	'contents'
> & { contents?: Record<string, T> }

export function RecursiveCollection<T extends TRef>(
	memberSchema: T,
	idPattern: TRef<TString>,
	refID: string,
	properties: TProperties = {},
	options: SchemaOptions = {}
) {
	return Type.Recursive(
		(thisType) =>
			Type.Composite([
				Collection(memberSchema, idPattern, properties, options),
				Type.Object({
					collections: Type.Optional(Dictionary(thisType))
				})
			]),
		{ $id: refID }
	)
}

export type RecursiveCollection<T> = Collection<T> & {
	collections?: Record<string, RecursiveCollection<T>>
}

/**
 * Note that `id` and `source` are always omitted.
 */
export function NodeAugmentSelf<
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(t: T, omitKeys: Array<keyof Static<T>> = [], options: SchemaOptions = {}) {
	return Utils.DeepPartial(
		Type.Omit(t, [...omitKeys, 'id', 'source', 'name']),
		options
	) as TObject
}

/**
 * Note that `id` is always omitted.
 */
export function NodeAugmentForeign<
	T extends TObject<{
		id: TString | TRef<TString>
		source?: TObject
		name?: TString
	}>
>(
	t: T,
	omitKeys: Array<keyof Static<T>> = [],
	extendsIDType: TString | TRef<TString> = t.properties.id,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Utils.DeepPartial(
				Type.Omit(t, [...omitKeys, 'id', 'source', 'name'])
			) as TObject,
			Type.Object({ augments: Type.Optional(Type.Array(extendsIDType)) })
		],
		options
	)
}
