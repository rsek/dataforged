import { EncounterNatureInfo } from "../classes/encounters/EncounterNatureInfo.js";
import { EncounterStarforged } from "../classes/index.js";
import { Gamespace } from "../json_out/index.js";
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export declare function buildEncounters<G extends Gamespace>(gamespace: G): EncounterStarforged[] | EncounterNatureInfo[];
//# sourceMappingURL=buildEncounters.d.ts.map