import { Gamespace } from "../schema_json";
import type { GameDataRoot } from "../schema_json";
/**
 * Extracts statistics on Ironsworn game data.
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { "Asset Types": assets, Encounters: encounters, "Move Categories": moves, "Oracle Sets": oracles, "Setting Truths": truths }: GameDataRoot): string;
export declare function assetStats(assetTypes: GameDataRoot["Asset Types"]): string;
export declare function truthStats(truthCategories: GameDataRoot["Setting Truths"]): string;
export declare function moveStats(moveCategories: GameDataRoot["Move Categories"]): string;
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export declare function oracleStats(oracles: GameDataRoot["Oracle Sets"]): string;
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export declare function encounterStats<G extends Gamespace>(gamespace: G, json: GameDataRoot["Encounters"]): string;
//# sourceMappingURL=dataforgedStats.d.ts.map