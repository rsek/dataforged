/**
 * Abstract interfaces and utility types that are only used internally.
 */

import type * as Localized from '@base-types/localize'
import type * as Metadata from '@base-types/metadata'

/**
 * A number range, for things shaped like rollable table rows.
 * @internal
 */
export interface Range<
	Low extends number | null = number | null,
	High extends number | null = number | null
> {
	low: Low
	high: High
}

/**
 * @internal
 */
export interface NodeLike<IDType = Metadata.ID> {
	_id: IDType
	source: Metadata.Source
	suggestions?: Metadata.Suggestions
}

export interface Node<IDType = Metadata.ID> extends NodeLike<IDType> {
	name: Localized.Label
}

export interface Cyclopedia<IDType> extends Node<IDType> {
	features: Localized.MarkdownPhrase[]
	summary: Localized.MarkdownSentences
	description: Localized.MarkdownParagraphs
	quest_starter?: Localized.MarkdownParagraph
}

type LocalizedKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = '_id' | 'source' | 'title' | 'rendering'

/**
 * Omits common metadata and localization keys.
 */
export type OmitMetaAndLocale<T> = Omit<T, LocalizedKeys | MetaKeys>

/**
 * Extends a single rules element
 */
export type ExtendOne<T extends NodeLike = NodeLike> = Partial<
	OmitMetaAndLocale<T>
> & {
	_extends: T['_id']
	_id: T['_id']
}

// TODO: could this include an optional regex key for extending all things that match a given ID?
/**
 * Extends multiple rules elements. A null value for "_extends" represents an extension to all qualifying elements.
 */
export type ExtendMany<T extends Node = Node> = Partial<
	OmitMetaAndLocale<T>
> & { _extends: Array<T['_id']> | null; _id?: Metadata.ID }
