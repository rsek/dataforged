
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { EncounterNatureStarforged } from "@json_out/encounters/EncounterNature.js";
import type { IEncounter } from "@json_out/encounters/index.js";
import type { IEncounterVariant } from "@json_out/index.js";

/**
 * @public
 */
export type EncounterIdStarforgedBase = `Encounters/${string}`;
/**
 * @public
 */
export type EncounterIdStarforged = `${Gamespace.Starforged}/${EncounterIdStarforgedBase}`;


/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export interface IEncounterStarforged extends IEncounter {
  $id: EncounterIdStarforged;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Variants: IEncounterVariant[];
}
