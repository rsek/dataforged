import type { Gamespace } from "../json_out/common/Gamespace.js";
import type { IronswornData } from "./buildDataforged.js";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { assets, encounters, moves, oracles, setting_truths }: IronswornData): string;
//# sourceMappingURL=dataforgedStats.d.ts.map