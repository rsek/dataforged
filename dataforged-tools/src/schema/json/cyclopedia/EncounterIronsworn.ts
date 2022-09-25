import type { Encounter, EncounterNatureClassic } from "@schema";

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface EncounterClassic extends Encounter {
  /**
   * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  Nature: EncounterNatureClassic;
  "Your Truth"?: string | undefined;
  Summary?: string | undefined;
}

