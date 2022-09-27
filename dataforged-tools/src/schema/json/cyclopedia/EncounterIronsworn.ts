import type { Encounter, EncounterNatureClassic } from "@schema";

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface EncounterClassic extends Encounter {
  /**
   * @pattern ^(starforged|ironsworn)/encounters/[a-z_-]+/[a-z_-]+$
   */
  $id: string;
  Nature: EncounterNatureClassic;
  "Your truth"?: string | undefined;
  Summary?: string | undefined;
}

