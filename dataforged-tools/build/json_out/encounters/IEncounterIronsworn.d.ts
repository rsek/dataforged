import type { Gamespace } from "../common/Gamespace.js";
import type { EncounterNatureIdBase } from "./IEncounterNatureInfo.js";
import type { EncounterNatureIronsworn, IEncounter } from "../index.js";
/**
 * @public
 */
export declare type EncounterIdIronswornBase = `${EncounterNatureIdBase}/${string}`;
/**
 * @public
 */
export declare type EncounterIdIronsworn = `${Gamespace.Ironsworn}/${EncounterIdIronswornBase}`;
/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export interface IEncounterIronsworn extends IEncounter {
    $id: EncounterIdIronsworn;
    Nature: EncounterNatureIronsworn;
    "Your Truth"?: string | undefined;
}
//# sourceMappingURL=IEncounterIronsworn.d.ts.map