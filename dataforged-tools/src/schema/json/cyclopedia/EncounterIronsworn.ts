import type { Encounter, EncounterNatureTypeClassic } from '@schema'

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface EncounterClassic extends Encounter {
  /**
   * @pattern ^ironsworn/encounters/[a-z_]+/[a-z_]+$
   */
  $id: string
  nature: EncounterNatureTypeClassic
  your_truth?: string | undefined
  summary?: string | undefined
}
