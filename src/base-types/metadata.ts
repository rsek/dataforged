import {
	type Localize,
	type Assets,
	type Moves,
	type Oracles
} from '@base-types'

export type Ruleset = 'classic' | 'starforged'
export type ID = string
export type Icon = string
export type Image = string
export type Color = string

export interface Source {
	title: string
	page?: number
	authors: [string, ...string[]]
	date: string
	uri: string
	license: string | null
}

export interface Title {
	canonical: Localize.Label
	standard?: Localize.Label
	short?: Localize.Label
}

/**
 * Stub interface for Suggestions.
 * @see {@link RulesetClassic.Suggestions}
 * @see {@link RulesetStarforged.Suggestions}
 */
export interface SuggestionsBase
	extends Record<string | never, string[] | undefined> {
	oracles?: Oracles.OracleTableID[]
	assets?: Assets.AssetID[]
	moves?: Moves.MoveID[]
}
