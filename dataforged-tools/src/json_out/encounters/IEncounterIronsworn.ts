import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { EncounterNatureIdBase } from "@json_out/encounters/IEncounterNatureInfo.js";
import type { EncounterNatureIronsworn , IEncounter } from "@json_out/index.js";

/**
 * @internal
 */
export type EncounterIdIronswornBase = `${EncounterNatureIdBase}/${string}`;
/**
 * @internal
 */
export type EncounterIdIronsworn = `${Gamespace.Ironsworn}/${EncounterIdIronswornBase}`;

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface IEncounterIronsworn extends IEncounter {
  /**
   * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-/]+/[A-z_-/]+$
   */
  $id: string;
  Nature: EncounterNatureIronsworn;
  "Your Truth"?: string | undefined;
}

