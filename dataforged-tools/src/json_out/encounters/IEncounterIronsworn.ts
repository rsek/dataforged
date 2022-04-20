import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { EncounterNatureIdBase } from "@json_out/encounters/IEncounterNatureInfo.js";
import type { EncounterNatureIronsworn , IEncounter } from "@json_out/index.js";

/**
 * @public
 */
export type EncounterIdIronswornBase = `${EncounterNatureIdBase}/${string}`;
/**
 * @public
 */
export type EncounterIdIronsworn = `${Gamespace.Ironsworn}/${EncounterIdIronswornBase}`;

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface IEncounterIronsworn extends IEncounter {
  $id: EncounterIdIronsworn;
  Nature: EncounterNatureIronsworn;
  "Your Truth"?: string | undefined;
}

