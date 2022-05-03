import type { Starforged, Ironsworn, IAssetType, IEncounterNatureInfo, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "./types";
import assetsSF from "./starforged/assets.json" assert {type: "json"};
import encountersSF from "./starforged/encounters.json" assert {type: "json"};
import movesSF from "./starforged/moves.json" assert {type: "json"};
import oraclesSF from "./starforged/oracles.json" assert {type: "json"};
import truthsSF from "./starforged/truths.json" assert {type: "json"};
import assetsIS from "./ironsworn/assets.json" assert {type: "json"};
import encountersIS from "./ironsworn/encounters.json" assert {type: "json"};
import movesIS from "./ironsworn/moves.json" assert {type: "json"};
import oraclesIS from "./ironsworn/oracles.json" assert {type: "json"};
// import truthsIS from "./ironsworn/truths.json" assert {type: "json"};

const starforged: Starforged = {
  assets: assetsSF as unknown as IAssetType[],
  encounters: encountersSF as IEncounterStarforged[],
  moves: movesSF as IMoveCategory[],
  oracles: oraclesSF as IOracleCategory[],
  truths: truthsSF as ISettingTruth[],
}

const ironsworn: Ironsworn = {
  assets: assetsIS as IAssetType[],
  encounters: encountersIS as IEncounterNatureInfo[],
  moves: movesIS as IMoveCategory[],
  oracles: oraclesIS as IOracleCategory[],
}

export {starforged, ironsworn}