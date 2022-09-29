import { Game } from "../schema";
import type { GameDataRoot } from "../schema";
/**
 * Extracts statistics on Ironsworn game data.
 */
export declare function dataforgedStats<G extends Game>(game: G, { asset_types, encounters, move_categories, oracle_sets, setting_truths }: GameDataRoot): string;
export declare function assetStats(asset_types: GameDataRoot['asset_types']): string;
export declare function truthStats(setting_truths: GameDataRoot['setting_truths']): string;
export declare function moveStats(move_categories: GameDataRoot['move_categories']): string;
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export declare function oracleStats(oracles: GameDataRoot['Oracle sets']): string;
/**
 * Creates a string of encounter stats for use in build messages.
 * @param game
 * @param json
 */
export declare function encounterStats<G extends Game>(game: G, json: GameDataRoot['encounters']): string;
//# sourceMappingURL=dataforgedStats.d.ts.map