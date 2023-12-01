import { TypeCompiler } from '@sinclair/typebox/compiler'
import { cloneDeep, compact, min } from 'lodash-es'
import * as Generic from '../../schema/datasworn/Generic.js'
import * as Utils from '../../schema/datasworn/Utils.js'
import Log from '../utils/Log.js'
import { Localize, Metadata } from '../../schema/datasworn/common/index.js'

function sortDictionary<
	T,
	D extends Generic.Dictionary<T> = Generic.Dictionary<T>
>(dictionary: D, sortFn: (a: T, B: T) => number) {
	const entries = Object.entries(dictionary).sort(([_keyA, a], [_keyB, b]) =>
		sortFn(a, b)
	)

	return Object.fromEntries(entries) as D
}

const commonRefs = [Localize.Label, Metadata.Source, Metadata.AuthorInfo]

const sourcedNodeValidatorSchema = Utils.OmitOptional(Generic.SourcedNodeBase, {
	additionalProperties: true
})

const SourcedNodeValidator = TypeCompiler.Compile(
	sourcedNodeValidatorSchema,
	commonRefs
)

function isSourcedNode<T extends Generic.SourcedNode = Generic.SourcedNode>(
	obj: unknown
): obj is T {
	return SourcedNodeValidator.Check(obj)
}

export function isCollection<
	T extends
		Generic.Collection<Generic.SourcedNode> = Generic.Collection<Generic.SourcedNode>
>(obj: unknown): obj is T {
	return isSourcedNode(obj) && ('contents' in obj || 'collections' in obj)
}

export function sortTopLevelCollection<
	T extends Generic.SourcedNode,
	D extends Generic.Dictionary<T> = Generic.Dictionary<T>
>(dictionary: D) {
	const result = sortDictionary<T>(dictionary, (a, b) => {
		// sort descendant collections since we're already iterating over them
		if (isCollection(a)) a = sortCollection(a as any)

		if (isCollection(a) && isCollection(b)) return compareCollection(a, b)

		return compareSourcedNode(a, b)
	})

	// Log.info(result)

	return result
}

export function sortCollection<
	T extends
		| Generic.Collection<Generic.SourcedNode>
		| Generic.RecursiveCollection<Generic.Collection<Generic.SourcedNode>>
>(collection: T) {
	const hasContents = Object.keys(collection.contents).length > 0

	const isRecursive = 'collections' in collection

	const hasCollections = isRecursive
		? Object.keys(collection.collections ?? {}).length > 0
		: false

	if (!hasContents && !hasCollections) return collection

	const result = cloneDeep(collection)

	const { contents } = result

	if (Object.keys(contents).length > 0)
		result.contents = sortDictionary(contents, compareSourcedNode)

	if (isRecursive && hasCollections) {
		const recursiveCollection = result as Generic.RecursiveCollection<
			Generic.Collection<Generic.SourcedNode>
		>
		const { collections } = recursiveCollection

		;(
			result as Generic.RecursiveCollection<
				Generic.Collection<Generic.SourcedNode>
			>
		).collections = sortDictionary(
			collections as Generic.Dictionary<any>,
			(
				a: Generic.RecursiveCollection<Generic.Collection<Generic.SourcedNode>>,
				b: Generic.RecursiveCollection<Generic.Collection<Generic.SourcedNode>>
			) => {
				if (isCollection(a)) a = sortCollection(a)
				return compareCollection(a, b)
			}
		)
	}

	return result
}

function compareSourcedNode(a: Generic.SourcedNode, b: Generic.SourcedNode) {
	if (typeof a.source?.page === 'number' && typeof b.source?.page === 'number')
		return a.source?.page - b.source?.page

	// if (typeof a.name === 'string' && typeof b.name === 'string')
	// 	return a.name.localeCompare(b.name)

	// console.log(a, b)
	for (const item of [a, b]) {
		if (!item.source?.page && item.id?.includes('collections'))
			Log.warn(`${item.id} is missing a page number.`)
	}

	return 0
}
function compareCollection(a: Generic.Collection, b: Generic.Collection) {
	const comparePageNumbers = compareSourcedNode(a, b)

	if (comparePageNumbers !== 0) return comparePageNumbers

	// get page numbers of collection children
	const pagesA = compact(
		Object.values(a.contents).map((v) => v.source?.page)
	) as number[]
	const pagesB = compact(
		Object.values(b.contents).map((v) => v.source?.page)
	) as number[]

	if (pagesA.length === 0 || pagesB.length === 0) return 0

	const minA = min(pagesA) as number
	const minB = min(pagesB) as number

	return minA - minB
}
