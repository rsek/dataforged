/**
 * Abstract interfaces and utility types that are only used internally.
 */

import type * as Types from '@base-types'

/**
 * A number range, for things shaped like rollable table rows. Type parameters are for for row-like objects that have a static range, such as delve features/dangers.
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
 * A node significant enough to have its own ID and source information. This usually means it's of some interest as a standalone object without other context, e.g. something that represents an asset or move.
 * @internal
 */
export interface Node<IDType = Types.Metadata.ID> {
	_id: IDType
	source: Types.Metadata.Source
	suggestions?: Types.Metadata.SuggestionsBase
}

// export interface Collectible<IDType = Types.Metadata.ID> extends Node<IDType> {
// 	name: Types.Localize.Label
// 	// collection?: string
// }

export interface Cyclopedia<IDType> extends Node<IDType> {
	name: Types.Localize.Label
	features: Types.Localize.MarkdownPhrase[]
	summary: Types.Localize.MarkdownSentences
	description: Types.Localize.MarkdownParagraphs
	quest_starter?: Types.Localize.MarkdownParagraph
}

type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = '_id' | 'source' | 'title' | 'rendering'

/**
 * Omits common metadata and localization keys.
 */
export type OmitMetaAndLocale<T> = Omit<T, LocalizeKeys | MetaKeys>

/**
 * Extends a single rules element
 */
export type ExtendOne<T extends Node = Node> = Partial<OmitMetaAndLocale<T>> & {
	_extends: T['_id']
	_id: T['_id']
}

// TODO: could this include an optional regex key for extending all things that match a given ID?
/**
 * Extends multiple rules elements. A null value for "_extends" represents an extension to all qualifying elements.
 */
export type ExtendMany<T extends Node = Node> = Partial<
	OmitMetaAndLocale<T>
> & { _extends: Array<T['_id']> | null; _id?: Types.Metadata.ID }

export interface Collection<T, IDType = Types.Metadata.ID>
	extends Types.Abstract.Node<IDType> {
	title: Types.Metadata.Title
	contents: Record<string, T>
	summary?: Types.Localize.MarkdownSentences
	description?: Types.Localize.MarkdownParagraphs
}

export interface RecursiveCollection<T, IDType = Types.Metadata.ID>
	extends Collection<T, IDType> {
	collections?: Record<string, Collection<T, IDType>>
}
