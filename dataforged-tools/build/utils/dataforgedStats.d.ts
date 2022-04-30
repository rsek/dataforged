import type { Gamespace } from "../json_out/common/Gamespace.js";
import type { Ironsworn } from "../json_out/Ironsworn.js";
import type { Starforged } from "../json_out/Starforged.js";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { assets, encounters, moves, oracles, truths }: Ironsworn | Starforged): string;
//# sourceMappingURL=dataforgedStats.d.ts.map