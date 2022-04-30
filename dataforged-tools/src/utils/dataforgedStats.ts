import type { Oracle, Row } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { Ironsworn } from "@json_out/Ironsworn.js";
import type { Starforged } from "@json_out/Starforged.js";
import { encounterStats } from "@utils/encounterStats.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";

/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export function dataforgedStats<G extends Gamespace>(gamespace: G, { assets, encounters, moves, oracles, truths }: Ironsworn|Starforged) {
  const oracleTables = JSONPath<Oracle[]>({ path: "$..Oracles[*].Table", json: oracles });
  const oracleSubtables = JSONPath<Row[]>({ json: oracleTables, path: "$..Subtable" });

  const assetCount = _.sum(assets.map(item => item.Assets.length));
  const moveCount = _.sum(moves.map(item => item.Moves.length));
  return `${assetCount} assets comprising ${assets.length} types,
    ${encounterStats(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleTables.length + oracleSubtables.length} oracle tables in ${oracles.length} categories,
    and ${truths?.length ?? 0} setting truth categories.`;
}