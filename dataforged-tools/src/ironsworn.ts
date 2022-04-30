/* eslint-disable no-restricted-imports */

import type { IAssetType, IEncounterNatureInfo, IMoveCategory, IOracleCategory, Ironsworn } from "@json_out/index.js";
import assets_is from "./json/ironsworn/assets.json" assert { type: "json" };
import encounters_is from "./json/ironsworn/encounters.json" assert { type: "json" };
import moves_is from "./json/ironsworn/moves.json" assert { type: "json" };
import oracles_is from "./json/ironsworn/oracles.json" assert { type: "json" };

/**
 * @public
 */
const ironsworn: Ironsworn = {
  assets: assets_is as IAssetType[],
  encounters: encounters_is as IEncounterNatureInfo[],
  moves: moves_is as IMoveCategory[],
  oracles: oracles_is as IOracleCategory[],
};

export { ironsworn };