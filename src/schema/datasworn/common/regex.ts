/** Regular expressions (and regular expression fragments) used to compose IDs and dictionary keys throughout datasworn. */

import { escapeRegExp } from 'lodash-es'

const INTEGER_POSITIVE = /[1-9][0-9]*/
const INTEGER_NON_NEGATIVE = oneOf(/0/, INTEGER_POSITIVE)

/** The character representing a "wildcard" element in a Datasworn ID. */
export const WILDCARD = escapeRegExp('*')
export const WILDCARD_MULTI = escapeRegExp('**')

/** Represents a dice range e.g. (1-50) */
export const DICE_RANGE = RegExp(
	[INTEGER_POSITIVE, INTEGER_POSITIVE].map((item) => item.source).join('-')
)

const MAX_DEPTH = 3

const SEP = new RegExp(escapeRegExp('/'))
const NAMESPACE = /[a-z][a-z0-9_]{3,}/
const KEY = /[a-z][a-z_]*/
const KEYS_RECURSIVE = new RegExp(
	`(${SEP.source}(${KEY.source})){1,${MAX_DEPTH}}`
)

const INDEX = INTEGER_NON_NEGATIVE

export const ELEMENTS = {
	/** The SEParator character for IDs */
	SEP,
	/** The namespace string that appears at the start of each ID */
	NAMESPACE,
	KEY,
	/** Represents an array index. */
	INDEX,
	DICE_RANGE
} as const

export const NAMESPACE_WILDCARD_ELEMENT = oneOf(
	new RegExp(WILDCARD),
	ELEMENTS.NAMESPACE
)

export const KEY_WILDCARD_RECURSIVE_ELEMENT = oneOf(
	new RegExp(WILDCARD_MULTI),
	new RegExp(KEYS_RECURSIVE)
)

export const NAMESPACE_ID = entireString(ELEMENTS.NAMESPACE)
export const DICT_KEY = entireString(ELEMENTS.KEY)
export const ENUM_VALUE = entireString(ELEMENTS.KEY)
export const ATTR = entireString(ELEMENTS.KEY)

function oneOf(...oneOf: RegExp[]) {
	return new RegExp(`(${oneOf.map((item) => item.source).join('|')})`)
}
function entireString(regex: RegExp) {
	let source = regex.source
	const start = '^'
	const end = '$'

	// strip if they're already present
	if (source.startsWith(start)) source = source.replace(start, '')
	if (source.endsWith(end)) source = source.replace(end, '')

	return new RegExp(`^${source}$`)
}
