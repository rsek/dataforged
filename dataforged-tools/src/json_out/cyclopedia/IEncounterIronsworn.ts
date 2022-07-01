//License: MIT
import type { EncounterNatureIronsworn , IEncounter } from "@json_out/index.js";

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface IEncounterIronsworn extends IEncounter {
  /**
   * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  Nature: EncounterNatureIronsworn;
  "Your Truth"?: string | undefined;
  Summary?: string | undefined;
}

