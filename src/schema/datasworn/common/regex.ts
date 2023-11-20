/** Regular expressions (and regular expression fragments) used to compose IDs and dictionary keys throughout datasworn. */

import { type StringOptions, type TString, Type } from '@sinclair/typebox'
import { escapeRegExp } from 'lodash-es'

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

export const Namespace = Symbol(namespace.source)
export type Namespace = typeof Namespace
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
	| Namespace
	| NodeRecursive
	| Node
	| Index
	| DiceRange
	| Collection
type IdElement = IdElementSymbol | string

const PatternElements = Symbol('PatternElements')
type IDOptions = StringOptions
type TID = TString & { [PatternElements]: IdElement[] }

export function ID(elements: IdElement[], options: IDOptions = {}) {
	const regex = new RegExp(`^${getPatternSubstrings(...elements).join('')}$`)
	const result = Type.RegExp(regex, options) as TID
	result[PatternElements] = elements
	return result
}
export function RecursiveCollectableID(
	type: IdElement[],
	options: IDOptions = {}
) {
	return ID([Namespace, ...type, NodeRecursive, Node], options)
}
export function RecursiveCollectionID(
	type: IdElement[],
	options: IDOptions = {}
) {
	return ID([Namespace, Collection, ...type, NodeRecursive], options)
}
export function CollectableID(type: IdElement[], options: IDOptions = {}) {
	return ID([Namespace, ...type, Node, Node], options)
}
export function CollectionID(type: IdElement[], options: IDOptions = {}) {
	return ID([Namespace, Collection, ...type, Node], options)
}

export function UncollectableID(type: IdElement[], options: IDOptions = {}) {
	return ID([Namespace, ...type, Node], options)
}

export function Extend(
	base: TID,
	append: IdElement[],
	options: IDOptions = {}
) {
	const baseElements = base[PatternElements].filter(
		(f) => f !== Collection
	) as [string, ...IdElement[]]

	return ID([...baseElements, ...append], options)
}

export function toWildcard(base: TID, options: IDOptions = {}) {
	const elements = base[PatternElements].map((item) => _toWildcard(item))
	return ID(elements, options)
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
