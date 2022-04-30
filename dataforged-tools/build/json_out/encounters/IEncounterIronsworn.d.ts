import type { Gamespace } from "../common/Gamespace.js";
import type { EncounterNatureIdBase } from "./IEncounterNatureInfo.js";
import type { EncounterNatureIronsworn, IEncounter } from "../index.js";
/**
 * @internal
 */
export declare type EncounterIdIronswornBase = `${EncounterNatureIdBase}/${string}`;
/**
 * @internal
 */
export declare type EncounterIdIronsworn = `${Gamespace.Ironsworn}/${EncounterIdIronswornBase}`;
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
//# sourceMappingURL=IEncounterIronsworn.d.ts.map