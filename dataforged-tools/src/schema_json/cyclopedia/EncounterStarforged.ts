import type { Encounter , EncounterNatureStarforged , EncounterVariant } from "@schema_json";

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export interface EncounterStarforged extends Encounter {
  /**
   * @pattern ^Starforged/Encounters/[A-z_-]+$
   */
  $id: string;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Variants?: EncounterVariant[] | undefined;
}
