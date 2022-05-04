import { Gamespace } from "../json_out/index.js";
import type { GameDataRoot, IEncounterNatureInfo, IEncounterStarforged, IOracleCategory } from "../json_out/index.js";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { "Asset Types": assets, Encounters: encounters, "Move Categories": moves, "Oracle Categories": oracles, "Setting Truths": truths }: GameDataRoot): string;
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
export declare function encounterStats<G extends Gamespace>(gamespace: G, json: IEncounterStarforged[] | IEncounterNatureInfo[]): string;
//# sourceMappingURL=dataforgedStats.d.ts.map