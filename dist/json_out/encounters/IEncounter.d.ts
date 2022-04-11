import type { IEncounterBase } from "./IEncounterBase.js";
import type { IEncounterVariant } from "../index.js";
/**
 * Interface representing an *Ironsworn: Starforged* Encounter entry.
 */
export interface IEncounter extends IEncounterBase {
    "Quest Starter": string;
    Summary: string;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    Variants: IEncounterVariant[];
}
//# sourceMappingURL=IEncounter.d.ts.map