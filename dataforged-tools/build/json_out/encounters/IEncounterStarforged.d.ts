import type { EncounterNatureStarforged } from "../index.js";
import type { IEncounter } from "../index.js";
import type { IEncounterVariant } from "../index.js";
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