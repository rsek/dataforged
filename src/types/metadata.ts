import {
  type Assets,
  type Encounters,
  type Moves,
  type Oracles
} from 'src/types'
import { type Label } from 'src/types/localized'

export type ID = string
export type Icon = string
export type Image = string

export interface Source {
  title: string
  page?: number
  authors: string[]
  date: string
  license: string | null
  uri: string
}

export interface Title {
  canonical: Label
  standard?: Label
  short?: Label
}

export interface Suggestions {
  oracles?: Oracles.ID[]
  assets?: Assets.ID[]
  moves?: Moves.ID[]
  encounters?: Encounters.ID[]
}
