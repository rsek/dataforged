import { Game } from "../schema";
import type { GameDataRoot } from "../schema";
/**
 * Extracts statistics on Ironsworn game data.
 */
export declare function dataforgedStats<G extends Game>(game: G, { "Asset types": assets, Encounters: encounters, "Move categories": moves, "Oracle sets": oracles, "Setting truths": truths }: GameDataRoot): string;
export declare function assetStats(assetTypes: GameDataRoot["Asset types"]): string;
export declare function truthStats(truthCategories: GameDataRoot["Setting truths"]): string;
export declare function moveStats(moveCategories: GameDataRoot["Move categories"]): string;
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export declare function oracleStats(oracles: GameDataRoot["Oracle sets"]): string;
/**
 * Creates a string of encounter stats for use in build messages.
 * @param game
 * @param json
 */
export declare function encounterStats<G extends Game>(game: G, json: GameDataRoot["Encounters"]): string;
//# sourceMappingURL=dataforgedStats.d.ts.map