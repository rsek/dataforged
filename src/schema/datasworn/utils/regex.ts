/** Utilities to compose regular expressions for IDs and dictionary keys. */

import {
	type StringOptions,
	type TString,
	Type,
	type ObjectOptions,
	type TUnion,
	TypeClone
} from '@sinclair/typebox'
import { escapeRegExp, omit, pick } from 'lodash-es'
import { UnionOneOf } from './UnionOneOf.js'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'
import { GetSourceDataSchema, setSourceDataSchema } from './Computed.js'
import { SetOptional } from './SetOptional.js'

const sep = escapeRegExp('/')
const wc = escapeRegExp('*')
const wce = wc + wc
const node = /([a-z][a-z_]*)/
const namespace = /([a-z0-9_]{3,})/
const index = /(0|[1-9][0-9]*)/
const range = /([1-9][0-9]*)-([1-9][0-9]*)/
const collection = /collections/
const nodeRecursive = recurse(node)

const recursiveElementWildcard = oneOf(
	nodeRecursive,
	new RegExp(sep + wce),
	new RegExp(sep + wce + sep + node.source),
	new RegExp(sep + node.source + sep + wce)
)

export const Pkg = Symbol(namespace.source)
export type Pkg = typeof Pkg
export const Node = Symbol(node.source)
export type Node = typeof Node
export const NodeRecursive = Symbol(nodeRecursive.source)
export type NodeRecursive = typeof NodeRecursive
export const Index = Symbol(index.source)
export type Index = typeof Index
export const DiceRange = Symbol(range.source)
export type DiceRange = typeof DiceRange
export const Collection = Symbol(collection.source)
export type Collection = typeof Collection
const noSeparator = [NodeRecursive]
type IdElementSymbol =
	| Pkg
	| NodeRecursive
	| Node
	| Index
	| DiceRange
	| Collection
export type IdElement = IdElementSymbol | string

export const PatternElements = Symbol('PatternElements')
type IdOptions = StringOptions & { $id: string }
type TId = TString &
	IdOptions & {
		[PatternElements]: IdElement[]
		pattern: string
	}
type TIdUnion = TUnion<Array<Omit<TId, '$id'> & TString>>

export function IdUnion(members: TId[], options: ObjectOptions) {
	const jtdRegex = oneOf(
		...members.map(
			(item) =>
				new RegExp(getPatternSubstrings(...item[PatternElements]).join(''))
		)
	)

	const extendedOptions = {
		[JsonTypeDef]: {
			schema: { type: 'string', metadata: { pattern: `^${jtdRegex.source}$` } }
		},
		...options
	}

	return Type.Union(members, extendedOptions) as TIdUnion
}

export function Id(elements: IdElement[], options: IdOptions) {
	const targetName = options.$id.replace(/Id$/, '')
	const indefiniteArticle = targetName.match(/^[AEIOU]/) ? 'an' : 'a'

	const result = Type.RegExp(
		new RegExp(`^${getPatternSubstrings(...elements).join('')}$`),
		{
			description: `A unique ID for ${indefiniteArticle} ${targetName}.`,
			...options,
			[PatternElements]: elements
		}
	) as TId

	return result
}
export function RecursiveCollectableId(type: IdElement[], options: IdOptions) {
	const base = Id([Pkg, ...type, NodeRecursive, Node], options)
	return setSourceDataSchema(base, (schema) => {
		const nuPattern = Id(['{{COLLECTION}}', Node], options)
		return IdUnion(
			[
				omit(TypeClone.Type(schema), '$id') as TId,
				{
					...omit(TypeClone.Type(schema), '$id'),
					...pick(nuPattern, PatternElements, 'pattern')
				} as TId
			],
			options
		)
	})
}
export function RecursiveCollectionId(type: IdElement[], options: IdOptions) {
	const base = Id([Pkg, Collection, ...type, NodeRecursive], options)
	return base
}
export function CollectableId(type: IdElement[], options: IdOptions) {
	const base = Id([Pkg, ...type, Node, Node], options)
	return setSourceDataSchema(base, (schema) => {
		const nuPattern = Id(['{{COLLECTION}}', Node], options)
		return IdUnion(
			[
				omit(TypeClone.Type(schema), '$id') as TId,
				{
					...omit(TypeClone.Type(schema), '$id'),
					...pick(nuPattern, PatternElements, 'pattern')
				} as TId
			],
			options
		)
	})
}
export function CollectionId(type: IdElement[], options: IdOptions) {
	const base = Id([Pkg, Collection, ...type, Node], options)

	return base
}

export function UncollectableId(type: IdElement[], options: IdOptions) {
	const base = Id([Pkg, ...type, Node], options)

	return base
}

export function Extend(base: TId, append: IdElement[], options: IdOptions) {
	const baseElements = base[PatternElements].filter(
		(f) => f !== Collection
	) as [string, ...IdElement[]]

	return Id([...baseElements, ...append], options)
}

export function toWildcard(
	base: TId,
	options: SetOptional<IdOptions, '$id'> = {}
) {
	if (!options.$id) {
		options.$id = base.$id + 'Wildcard'
	}

	if (base.title && !options.title)
		options.title = base.title + ' (with wildcard)'
	const elements = base[PatternElements].map((item) => _toWildcard(item))

	if (!options.description && options.$id) {
		const targetName = options.$id.replace(/IdWildcard$/, '')
		options.description = `A wildcarded ID that can be used to match multiple ${targetName}s.`
	}

	return Id(elements, options as IdOptions)
}

function wildcard(pattern: RegExp) {
	return oneOf(new RegExp(wc), pattern)
}
function group(pattern: RegExp) {
	return new RegExp(`(${pattern.source})`)
}
function recurse(pattern: RegExp) {
	return new RegExp(`(${sep}${pattern.source}){1,3}`)
}
function oneOf(...items: RegExp[]) {
	return group(new RegExp(items.map((item) => item.source).join('|')))
}
function _toWildcard<T extends IdElement>(element: T) {
	switch (true) {
		case typeof element === 'string':
		case element === Collection:
			return element
		case element === NodeRecursive:
			return recursiveElementWildcard.source
		default: {
			const src = (element as symbol)?.description as string
			const regexp = new RegExp(src)
			return wildcard(regexp).source
		}
	}
}
function getPatternSubstrings(...elements: IdElement[]) {
	elements = [...elements]

	const idParts = []

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i]

		const needsSeparator =
			i > 0 && (typeof element === 'string' || !noSeparator.includes(element))

		if (needsSeparator) idParts.push(sep)

		idParts.push((element as symbol).description ?? element)
	}

	return idParts
}
