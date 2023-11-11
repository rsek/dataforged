/**
 * Abstract interfaces and utility types that are only used internally. They are not included in the final schema.
 */
import {
	Type,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TBoolean,
	type TLiteral,
	type TNumber,
	type TObject,
	type TProperties,
	type TRef,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import { mapValues } from 'lodash-es'
import { type PartialDeep, type Simplify } from 'type-fest'
import type { OracleTableRow } from '../oracles.js'
import { DICT_KEY } from './regex.js'
import * as Localize from './localize.js'
import * as Metadata from './metadata.js'
import * as Utils from './utils.js'
import { Clone } from '@sinclair/typebox/value/clone'

export function Dictionary<T extends TSchema>(
	valuesSchema: T,
	options: ObjectOptions = {}
) {
	return Type.Record(Type.RegEx(DICT_KEY), valuesSchema, {
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
	min: Type.Integer({ description: 'The low end of the dice range.' }),
	max: Type.Integer({ description: 'The high end of the dice range.' })
})
export type DiceRange = Static<typeof DiceRange>

export function StaticDiceRange<Min extends number, Max extends number>(
	range: { min: Min; max: Max },
	options: ObjectOptions = {}
) {
	return MappedKeys(
		DiceRange,
		['min', 'max'],
		({ description }, k) => Type.Literal(range[k], { description }),
		options
	) as TObject<{
		min: TLiteral<Min>
		max: TLiteral<Max>
	}>
}
export type StaticDiceRange<Low extends number, High extends number> = Static<
	ReturnType<typeof StaticDiceRange<Low, High>>
>

export const BlankDiceRange = MappedKeys(
	DiceRange,
	Object.keys(DiceRange.properties) as Array<
		keyof (typeof DiceRange)['properties']
	>,
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
		min?: number
		max?: number
	},
	defaults: PartialDeep<OracleTableRow> = {}
) {
	const result = Type.Object({
		...toLiteralsStub(literals),
		...toDefaultsStub(defaults)
	})
	return result
}

const sourcedNodeBaseProps = Type.Object({
	name: Type.Ref(Localize.Label),
	canonical_name: Type.Optional(Type.Ref(Localize.Label)),
	source: Type.Ref(Metadata.Source),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions))
})

export function SourcedNode<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
) {
	return Utils.Squash([sourcedNodeBaseProps, schema], {
		isSourcedNode: true,
		...options
	}) as TObject<(typeof sourcedNodeBaseProps)['properties'] & T['properties']>
}
export type SourcedNode<T = Record<string, unknown>> = Static<
	typeof sourcedNodeBaseProps
> &
	T

export function Cyclopedia<T extends TProperties>(
	properties: T,
	options: ObjectOptions = {}
) {
	return SourcedNode(
		Type.Object({
			features: Type.Array(Type.Ref(Localize.MarkdownString)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Ref(Localize.MarkdownString),
			quest_starter: Type.Ref(Localize.MarkdownString),
			your_truth: Type.Optional(Type.Ref(Localize.MarkdownString)),
			...properties
		}),
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
 * Enhances a single rules element
 */
export function EnhanceOne<T extends TObject>(t: T) {
	return Type.Composite([
		OmitMeta(t),
		Type.Object({ enhances: Type.Optional(t.properties.id) })
	])
}
export type EnhanceOne<T extends TObject> = Static<
	ReturnType<typeof EnhanceOne<T>>
>

export function EnhanceMany<T extends TObject>(
	enhanceSchema: T,
	extendIds: TString | TRef<TString>,
	options: ObjectOptions = {}
) {
	const noMeta = Utils.DeepPartial(OmitMeta(enhanceSchema))
	return Type.Composite(
		[noMeta, Type.Object({ enhances: Type.Optional(Type.Array(extendIds)) })],
		options
	)
}
export type EnhanceMany<T extends TObject> = Static<
	ReturnType<typeof EnhanceMany<T>>
>

const CollectionBase = Type.Object({
	color: Type.Optional(Type.Ref(Metadata.CSSColor)),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Optional(Type.Ref(Localize.MarkdownString))
})

export function Collection<T extends TRef>(
	memberSchema: T,
	idPattern: TRef<TString>,
	properties: TObject,
	options: SchemaOptions = {}
) {
	const params = Type.Object({
		id: idPattern,
		enhances: Type.Optional({
			...idPattern,
			description:
				"Indicates that this collection's content enhances another collection, rather than being a standalone collection of its own."
		}),
		contents: Type.Optional(Dictionary(memberSchema))
	})
	const base = Utils.Squash([CollectionBase, params])
	type base = TObject<
		(typeof CollectionBase)['properties'] & (typeof params)['properties']
	>

	return SourcedNode(Utils.Squash([base, properties]), options)
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
				Collection(memberSchema, idPattern, Type.Object(properties), options),
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
export function NodeEnhanceSelf<
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(t: T, omitKeys: Array<keyof Static<T>> = [], options: SchemaOptions = {}) {
	const base = Clone(Type.Omit(t, [...omitKeys, 'id', 'source', 'name']))

	// strip defaults, they just get in the way of enhancements
	for (const k in base.properties) {
		const v = base.properties[k]
		if (typeof v?.default !== 'undefined') delete v.default
	}

	return Utils.DeepPartial(base, options) as TObject
}

/**
 * Note that `id` is always omitted.
 */
export function NodeEnhanceForeign<
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
			Type.Object({ enhances: Type.Optional(Type.Array(extendsIDType)) })
		],
		options
	)
}
