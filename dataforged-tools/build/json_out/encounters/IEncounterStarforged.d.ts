import type { Gamespace } from "../common/Gamespace.js";
import type { EncounterNatureStarforged } from "./EncounterNature.js";
import type { IEncounter } from "./index.js";
import type { IEncounterVariant } from "../index.js";
/**
 * @internal
 * @asType string
 */
export declare type EncounterIdStarforgedBase = `Encounters/${string}`;
/**
 * @internal
 * @asType string
 */
export declare type EncounterIdStarforged = `${Gamespace.Starforged}/${EncounterIdStarforgedBase}`;
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
//# sourceMappingURL=IEncounterStarforged.d.ts.map