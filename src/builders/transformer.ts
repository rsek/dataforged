import { cloneDeep, forEach, mapValues } from 'lodash-es'
import { trackID } from './id-tracker.js'

import { type SetOptional } from 'type-fest'
import {
	type RecursiveCollectionSource,
	type Collection,
	type RecursiveCollection,
	type CollectionSource
} from '../schema/datasworn/Generic.js'
import { type Rules } from '../schema/datasworn/Rules.js'
import { type SourcedNode } from '../schema/datasworn/generic/SourcedNode.js'

type PartialKeys<T, K extends string | number | symbol> = Omit<T, K> &
	Partial<T>

type SourceData<T extends object> = 'id' extends keyof T
	? SetOptional<T, 'id'>
	: T

export function sourcedTransformer<
	TIn extends SourceData<SourcedNode>,
	TOut extends SourcedNode,
	TParent extends SourcedNode | Rules | null
>(
	partialTransformer: PartialKeys<
		Transformer<TIn, TOut, TParent>,
		'id' | 'source'
	>
) {
	return {
		id: function (
			data: TIn,
			key: string | number,
			parent: SourcedNode | null
		): string {
			if (data.id != null) return trackID(data.id)

			if (parent == null)
				throw new Error(
					'Data has no ID of its own, and no parent to generate its own ID from'
				)

			return trackID(parent.id.replace('/collections/', '/') + `/${key}`)
		},
		// source: function (
		// 	data: TIn,
		// 	key: string | number,
		// 	parent: SourcedNode | null
		// ): Datasworn.Source {
		// 	return data.source as any
		// },
		...partialTransformer
	} as Transformer<TIn, TOut, TParent>
}

type Collected<T extends { contents?: Record<string, any> }> = T extends {
	contents?: Record<string, infer U>
}
	? U
	: never

export function collectionTransformer<
	TIn extends CollectionSource,
	TOut extends Collection,
	TParent extends SourcedNode | null = null
>(
	collectionKey: string,
	itemTransformer: Transformer<Collected<TIn>, Collected<TOut>, TOut>,
	partialTransformer: Omit<
		Transformer<TIn, TOut, TParent>,
		'source' | 'id' | 'contents'
	>,
	isRecursive = false
) {
	let result = {
		id: function (data: TIn, key: string | number, parent: TParent): string {
			const baseId = parent.id.replace('/collections/', '/')
			const [namespace, _cKey, ...tail] = baseId.split('/')

			const parts = [
				namespace,
				'collections',
				collectionKey,
				...tail,
				key.toString()
			]

			return trackID(parts.join('/'))
		},
		contents: function (
			this: SourcedNode,
			data: TIn,
			key: string | number,
			parent: TParent
		): Record<string, Collected<TOut>> | undefined {
			if (data.contents == null) return undefined
			return mapValues(data.contents, (v, k) =>
				transform(v, k, this, itemTransformer as any)
			) as Record<string, Collected<TOut>>
		},
		...partialTransformer
	} as Transformer<TIn, TOut, TParent>

	if (isRecursive && !('collections' in result))
		result = {
			...result,
			collections: function (
				this: SourcedNode,
				data: TIn,
				key: string | number,
				parent: TParent
			) {}
		}

	return result
}

export function recursiveCollectionTransformer<
	TIn extends RecursiveCollectionSource,
	TOut extends RecursiveCollection,
	TParent extends SourcedNode | null,
	TItemTransformer extends Transformer<
		Collected<TIn>,
		Collected<TOut>,
		TOut
	> = Transformer<Collected<TIn>, Collected<TOut>, TOut>
>(
	collectionKey: string,
	itemTransformer: TItemTransformer,
	partialTransformer: Omit<
		Transformer<TIn, TOut, TParent>,
		'source' | 'id' | 'contents'
	>
) {
	const result = collectionTransformer<TIn, TOut, TParent>(
		collectionKey,
		itemTransformer,
		{
			...partialTransformer,
			collections: function (
				this: SourcedNode,
				data: TIn
			): Record<string, TOut> | undefined {
				if (data.collections == null) return undefined
				return mapValues(data.collections, (v, k) =>
					transform(
						v,
						k,
						this,
						recursiveCollectionTransformer(
							collectionKey,
							itemTransformer,
							partialTransformer
						) as any
					)
				) as any
			}
		}
	)
	return result
}

export type Transformer<
	TIn,
	TOut,
	TParent extends SourcedNode | Rules | null
> = {
	[K in keyof Required<TOut> as K extends keyof TIn
		? K extends InitialKeys
			? K
			: TIn[K] extends Partial<TOut>[K]
			  ? never
			  : K
		: K]: K extends InitialKeys
		? (data: TIn, key: string | number, parent: TParent) => TOut[K]
		: (
				this: SourcedNode,
				data: TIn,
				key: string | number,
				parent: TParent
		  ) => TOut[K] // if they both have the key and it's the same type value, omit -- it doesn't need transforming
}

type InitialKeys = 'id' | 'source'

export function transform<
	TIn,
	TOut,
	TParent extends SourcedNode | Rules | null
>(
	data: TIn,
	key: string | number,
	parent: TParent,
	transformer: Transformer<TIn, TOut, TParent>
): TOut {
	const result = cloneDeep(data) as Partial<TOut>

	const initialKeys: InitialKeys[] = ['id', 'source']

	initialKeys.forEach((initialKey) => {
		if ((transformer as any)[initialKey] != null) {
			// @ts-expect-error set up keys to allow iteration over the rest
			result[initialKey] = transformer[initialKey](data, key, parent)
		}
	})
	forEach(transformer, (transform, k) => {
		if (!initialKeys.includes(k as any)) {
			// @ts-expect-error bind and iterate over remaining keys
			result[k] = transform.bind(result)(data, key, parent)
		}
	})

	return result as TOut
}
