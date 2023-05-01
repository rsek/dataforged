import { type Assets, type Moves, type Oracles } from '@base-types'
import { type Static, Type, type TSchema } from '@sinclair/typebox'
import { StringEnum } from 'base-types/utils'

export const Ruleset = StringEnum(['classic', 'starforged'])
export type Ruleset = Static<typeof Ruleset>
export const ID = Type.String()
export type ID = Static<typeof ID>
export const SvgImageURL = Type.String()
export type SvgImageURL = Static<typeof SvgImageURL>
export const WebpImageURL = Type.String()
export type WebpImageURL = Static<typeof WebpImageURL>
export const CSSColor = Type.String()
export type CSSColor = Static<typeof CSSColor>

export const Source = Type.Object({
	title: Type.String(),
	page: Type.Optional(Type.Integer({ minimum: 1 })),
	authors: Type.Array(Type.String(), { minItems: 1 }),
	date: Type.Date(),
	url: Type.String({ format: 'url' }),
	license: Type.String({ format: 'url' })
})

export type Source = Static<typeof Source>

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

export const SuggestionsBase = Type.Object({
	oracles: Type.Optional(),
	assets: Type.Optional(),
	moves: Type.Optional()
})
