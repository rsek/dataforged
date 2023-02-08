import {
  type Localize,
  type Assets,
  type Encounters,
  type Moves,
  type Oracles,
  DelveSites,
  Regions
} from '@df-types'

export type Ruleset = 'classic' | 'starforged'
export type ID = string
export type Icon = string
export type Image = string
export type Color = string

export interface Source {
  title: string
  page?: number
  authors: string[]
  date: string
  uri: string
  license: string | null
}

export interface Title {
  canonical: Localize.Label
  standard?: Localize.Label
  short?: Localize.Label
}

export interface SuggestionsBase extends Record<string, string[] | undefined> {
  oracles?: Oracles.OracleTableID[]
  assets?: Assets.AssetID[]
  moves?: Moves.MoveID[]
}

export interface SuggestionsClassic extends SuggestionsBase {
  site_domains?: DelveSites.DelveSiteDomainID[]
  site_themes?: DelveSites.DelveSiteThemeID[]
  encounters?: Encounters.EncounterClassicID[]
  regions?: Regions.RegionEntryID[]
}
export interface SuggestionsStarforged extends SuggestionsBase {
  encounters?: Encounters.EncounterStarforgedID[]
}

export type Suggestions = SuggestionsClassic | SuggestionsStarforged
