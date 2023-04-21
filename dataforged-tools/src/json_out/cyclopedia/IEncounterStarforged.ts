import type { EncounterNatureStarforged , IEncounter , IEncounterVariant } from "@json_out/index.js";

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export interface IEncounterStarforged extends IEncounter {
  /**
   * @pattern ^Starforged/Encounters/[A-z_-]+$
   */
  $id: string;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Variants: IEncounterVariant[];
}
