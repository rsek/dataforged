import { type Assets, type Moves, type Oracles } from '@base-types'

export type Ruleset = 'classic' | 'starforged'
export type ID = string
export type SvgImageUrl = string
export type WebpImageURL = string
export type Color = string

export interface Source {
	title: string
	page?: number
	authors: [string, ...string[]]
	date: string
	url: string
	license: string
}

/**
 * Stub interface for Suggestions.
 * @see {@link RulesetClassic.Suggestions}
 * @see {@link RulesetStarforged.Suggestions}
 */
export interface SuggestionsBase {
	oracles?: Oracles.OracleTableID[]
	assets?: Assets.AssetID[]
	moves?: Moves.MoveID[]
}
