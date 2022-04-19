import type { Gamespace } from "../common/Gamespace.js";
import type { EncounterNatureStarforged } from "./EncounterNature.js";
import type { IEncounter } from "./index.js";
import type { IEncounterVariant } from "../index.js";
/**
 * @public
 */
export declare type EncounterIdStarforgedBase = `Encounters/${string}`;
/**
 * @public
 */
export declare type EncounterIdStarforged = `${Gamespace.Starforged}/${EncounterIdStarforgedBase}`;
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
//# sourceMappingURL=IEncounterStarforged.d.ts.map