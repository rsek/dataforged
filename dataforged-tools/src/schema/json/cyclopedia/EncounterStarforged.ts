import type { Encounter, EncounterNatureTypeStarforged, EncounterVariant } from '@schema'

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export interface EncounterStarforged extends Encounter {
  /**
   * @pattern ^starforged/encounters/[a-z_-]+$
   */
  $id: string
  Nature: EncounterNatureTypeStarforged
  Summary: string
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Variants?: {[key: string]: EncounterVariant} | undefined
}
