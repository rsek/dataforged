import type { EncounterBase } from '@schema'

/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export interface Encounter extends EncounterBase {
  Features: string[]
  Drives: string[]
  Tactics: string[]
  'Quest starter': string
  'Your truth'?: string | undefined
}
