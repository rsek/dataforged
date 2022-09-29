import type { Encounter, EncounterVariant } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
/**
 * @public
 */
export enum EncounterNatureTypeStarforged {
  Creature = 'creature',
  Horror = 'horror',
  Human = 'human',
  Machine = 'machine',
  Monster = 'monster'
}

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export interface EncounterStarforged extends Encounter {
  /**
   * @pattern ^starforged/encounters/[a-z_-]+$
   */
  $id: string
  nature: EncounterNatureTypeStarforged
  summary: string
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  variants?: { [key: SnakeCaseString]: EncounterVariant } | undefined
}
