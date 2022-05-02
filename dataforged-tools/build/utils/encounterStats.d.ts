import type { EncounterNatureInfo } from "../classes/encounters/EncounterNatureInfo.js";
import type { EncounterStarforged } from "../classes/index.js";
import { Gamespace } from "../json_out/index.js";
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export declare function encounterStats<G extends Gamespace>(gamespace: G, json: EncounterStarforged[] | EncounterNatureInfo[]): string;
//# sourceMappingURL=encounterStats.d.ts.map