/**
 * Abstract interfaces and utility types that are only used internally.
 */

import type * as Types from '@base-types'
import { type RecursivePartial } from 'utils'

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
 * A node significant enough to have its own ID.
 */
export interface Node<IDType = Types.Metadata.ID> {
	id: IDType
}

/**
 * A node significant enough to have its own ID and source information. This usually means it's of some interest as a standalone object without other context, e.g. something that represents an asset or move.
 * @internal
 */
export interface SourcedNode<IDType = Types.Metadata.ID> extends Node<IDType> {
	id: IDType
	source: Types.Metadata.Source
	suggestions?: Types.Metadata.SuggestionsBase
}

// export interface Collectible<IDType = Types.Metadata.ID> extends Node<IDType> {
// 	name: Types.Localize.Label
// 	// collection?: string
// }

export interface Cyclopedia<IDType> extends SourcedNode<IDType> {
	name: Types.Localize.Label
	features: Types.Localize.MarkdownPhrase[]
	summary: Types.Localize.MarkdownSentences
	description: Types.Localize.MarkdownParagraphs
	quest_starter?: Types.Localize.MarkdownParagraph
}

// type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = 'id' | 'source' | 'title' | 'rendering' | 'name' | 'suggestions'

/**
 * Omits common metadata and localization keys.
 */
export type OmitMeta<T> = Omit<T, MetaKeys>

/**
 * Extends a single rules element
 */
export type ExtendOne<T extends Node> = RecursivePartial<OmitMeta<T>> & {
	extends: T['id']
	id: T['id']
}

// TODO: could this include an optional regex key for extending all things that match a given ID?
/**
 * Extends multiple rules elements. A null value for "extends" represents an extension to all qualifying elements.
 */
export type ExtendMany<T extends Node> = RecursivePartial<OmitMeta<T>> & {
	extends: Array<T['id']> | null
	// id: Types.Metadata.ID
}

export interface Collection<T, IDType = Types.Metadata.ID>
	extends Types.Abstract.SourcedNode<IDType> {
	name: string
	canonical_name?: string
	contents: Record<string, T>
	color?: Types.Metadata.Color
	summary: Types.Localize.MarkdownSentences
	description?: Types.Localize.MarkdownParagraphs
}

export interface RecursiveCollection<T, IDType = Types.Metadata.ID>
	extends Collection<T, IDType> {
	collections?: Record<string, this>
}

/**
 * Describes an editable number range.
 */
export interface NumberRangeBase {
	label: Types.Localize.Label
	min: number
	value: number
	max: number | null
}

export interface Clock extends NumberRangeBase {
	// min: 0
	// max: 4 | 6 | 8 | 10
}

export interface Meter extends NumberRangeBase {
	min: number
	max: number
}

export interface Counter extends NumberRangeBase {
	min: number
	max: number | null
}

/**
 * Describes a set of choices.
 */
export interface ChoicesBase<TChoice extends ChoiceBase = ChoiceBase> {
	label: Types.Localize.Label
	choices: Record<string, TChoice>
}

export interface ChoiceBase<
	TValue extends number | string | object = number | string | object
> {
	// id: string
	label: Types.Localize.Label
	value: TValue
}
