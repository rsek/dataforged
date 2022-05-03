import type { EncounterNatureInfo, EncounterStarforged } from "../classes/index.js";
import { Gamespace } from "../json_out/index.js";
import type { IOracleCategory, Ironsworn, Starforged } from "../json_out/index.js";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { assets, encounters, moves, oracles, truths }: Ironsworn | Starforged): string;
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export declare function oracleStats(oracles: IOracleCategory[]): string;
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export declare function encounterStats<G extends Gamespace>(gamespace: G, json: EncounterStarforged[] | EncounterNatureInfo[]): string;
//# sourceMappingURL=dataforgedStats.d.ts.map