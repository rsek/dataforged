import {
  type Localize,
  type Assets,
  type Encounters,
  type Moves,
  type Oracles
} from '@df-types'

export type Ruleset = 'classic' | 'starforged'
export type ID = string
export type Icon = string
export type Image = string

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

export interface Suggestions {
  oracles?: Oracles.OracleTableID[]
  assets?: Assets.AssetID[]
  moves?: Moves.MoveID[]
  encounters?: (
    | Encounters.EncounterStarforgedID
    | Encounters.EncounterClassicID
  )[]
}
