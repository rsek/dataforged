import {
	Type,
	TypeClone,
	type SchemaOptions,
	type TObject,
	type TOptional,
	type TRef
} from '@sinclair/typebox'
import type * as TypeFest from 'type-fest'
import type * as Id from '../common/Id.js'
import * as Localize from '../common/Localize.js'
import * as Metadata from '../common/Metadata.js'
import * as Utils from '../Utils.js'
import { Dictionary, type TDictionary } from './Dictionary.js'
import { SourcedNode, type TSourcedNode } from './SourcedNode.js'
import { type IdentifiedNode } from './IdentifiedNode.js'

const CollectionMixin = Type.Object({
	color: Type.Optional(
		Type.Ref(Metadata.CssColor, {
			description: 'A thematic color associated with this collection.'
		})
	),
	summary: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.'
		})
	),
	description: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				"A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead."
		})
	),
	images: Type.Optional(
		Type.Array(
			Type.Ref(Metadata.WebpImageUrl, {
				description: 'Extra images associated with this collection.'
			})
		)
	),
	icon: Type.Optional(
		Type.Ref(Metadata.SvgImageUrl, {
			description: 'An SVG icon associated with this collection.'
		})
	)
})

export const CollectionBrand = Symbol('Collection')
type TCollectionID = Id.AnyID
type TCollectionIdMixin<T extends TRef = TRef> = TObject<{
	enhances: TOptional<TCollectionID>
	replaces: TOptional<TCollectionID>
	contents: TDictionary<T>
}>

export function Collection<T extends TRef>(
	id: TCollectionID,
	collectable: T,
	options: SchemaOptions = {}
) {
	const idMixin: TCollectionIdMixin<T> = Type.Object({
		enhances: Type.Optional(
			TypeClone.Type(id, {
				description:
					"This collection's content enhances the identified collection, rather than being a standalone collection of its own."
			})
		),
		replaces: Type.Optional(
			TypeClone.Type(id, {
				description:
					'This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.'
			})
		),
		contents: Dictionary(collectable, { default: {} })
	})
	const base = Utils.Assign([CollectionMixin, idMixin]) as TObject<
		(typeof CollectionMixin)['properties'] & TCollectionIdMixin<T>['properties']
	>

	const result = SourcedNode(id, base, {
		...options,
		[CollectionBrand]: 'Collection'
	})

	return result as TCollection<T>
}

export type TCollection<T extends TRef> = TSourcedNode<
	TObject<
		(typeof CollectionMixin)['properties'] & TCollectionIdMixin<T>['properties']
	>
> & { [CollectionBrand]: 'Collection' }

export type Collection<T = any> = SourcedNode<{
	id: string
	color?: string
	summary?: string
	description?: string
	images?: string[]
	icon?: string
	enhances?: string
	replaces?: string
	contents: Record<string, T>
}>

export const RecursiveCollectionBrand = Symbol('RecursiveCollection')

export function RecursiveCollection<T extends TCollection<TRef>>(
	collection: T,
	options: TypeFest.SetRequired<SchemaOptions, '$id'>
) {
	// @ts-expect-error
	return Utils.Assign(
		[
			collection,
			Type.Object({
				collections: Dictionary(Type.Ref(options.$id), { default: {} })
			})
		],
		{
			...options,
			[CollectionBrand]: 'Collection',
			[RecursiveCollectionBrand]: 'RecursiveCollection'
		}
	) as TRecursiveCollection<T, 3>
}
// based on es2019 FlatArray
/** Limits recursion to 3 levels (which is the maximum number of times the IDs can recurse through collections) */

export type TRecursiveCollection<
	T extends TCollection<TRef>,
	Depth extends number = 3
> = T & {
	[RecursiveCollectionBrand]: 'RecursiveCollection'
} & {
		done: T

		// This should probably be TDictionary<TRecursiveCollection<T>, [-1,-1,0,1][Depth]>, but TS complains about recursion depth even with that
		recur: TRecursiveCollection<T, [-1, 0, 1, 2][Depth]>
	}[Depth extends -1 ? 'done' : 'recur']

export type RecursiveCollection<
	T extends Collection<IdentifiedNode>,
	Depth extends number = 3
> = {
	done: T
	recur: RecursiveCollection<T, [-1, 0, 1, 2][Depth]> &
		T & {
			collections: Record<string, RecursiveCollection<T, [-1, -1, 0, 1][Depth]>>
		}
}[Depth extends -1 ? 'done' : 'recur']
