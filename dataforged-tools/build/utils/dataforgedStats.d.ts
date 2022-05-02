import type { Gamespace, Ironsworn, Starforged } from "../json_out/index.js";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export declare function dataforgedStats<G extends Gamespace>(gamespace: G, { assets, encounters, moves, oracles, truths }: Ironsworn | Starforged): string;
//# sourceMappingURL=dataforgedStats.d.ts.map