import { trackID } from './id-tracker.js'
import { cloneDeep, forEach, mapValues, merge } from 'lodash-es'

import { type SetOptional } from 'type-fest'
import type * as Out from '../types/io/datasworn.js'
import {
	Collection,
	RecursiveCollection
} from '../schema/datasworn/common/abstract.js'

type PartialKeys<T, K extends string | number | symbol> = Omit<T, K> &
	Partial<T>

export function sourcedTransformer<
	TIn extends SourceHaver,
	TOut extends SourceHaver,
	TParent extends SourceHaver | null = SourceHaver
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
			parent: SourceHaver | null
		): string {
			if (data.id != null) return trackID(data.id)

			if (parent == null)
				throw new Error(
					'Data has no ID of its own, and no parent to generate its own ID from'
				)

			return trackID(parent.id.replace('/collections/', '/') + `/${key}`)
		},
		source: function (
			data: TIn,
			key: string | number,
			parent: SourceHaver | null
		): Out.Source {
			return data.source as any
		},
		...partialTransformer
	} as Transformer<TIn, TOut, TParent>
}

type YamlData<T extends { id: string }> = SetOptional<T, 'id'>

type Collected<T extends { contents?: Record<string, any> }> = T extends {
	contents?: Record<string, infer U>
}
	? U
	: never

export function collectionTransformer<
	TIn extends YamlData<Collection<YamlData<SourceHaver>>>,
	TOut extends Collection<SourceHaver>,
	TParent extends SourceHaver = SourceHaver
>(
	collectionKey: string,
	itemTransformer: Transformer<Collected<TIn>, Collected<TOut>>,
	partialTransformer: Omit<
		Transformer<TIn, TOut, TParent>,
		'source' | 'id' | 'contents'
	>,
	isRecursive = false
) {
	let result = {
		source: function (
			data: TIn,
			key: string | number,
			parent: TParent
		): Out.Source {
			return data.source as Out.Source
		},
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
			this: SourceHaver,
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
	} as Transformer<TIn, TOut>

	if (isRecursive && !('collections' in result))
		result = {
			...result,
			collections: function (
				this: SourceHaver,
				data: TIn,
				key: string | number,
				parent: TParent
			) {}
		}

	return result
}

export function recursiveCollectionTransformer<
	TIn extends YamlData<RecursiveCollection<any>>,
	TOut extends RecursiveCollection<any>,
	TItemTransformer extends Transformer<
		Collected<TIn>,
		Collected<TOut>
	> = Transformer<Collected<TIn>, Collected<TOut>>,
	TParent extends SourceHaver = SourceHaver
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
				this: SourceHaver,
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
	TIn extends object,
	TOut extends object,
	TParent extends SourceHaver | null = SourceHaver
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
				this: SourceHaver,
				data: TIn,
				key: string | number,
				parent: TParent
		  ) => TOut[K] // if they both have the key and it's the same type value, omit -- it doesn't need transforming
}
export interface SourceHaver {
	source: Out.Source
	id: string
}
type InitialKeys = 'id' | 'source'

export function transform<
	TIn extends object,
	TOut extends TIn,
	TParent extends SourceHaver = SourceHaver
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
