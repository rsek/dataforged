import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth, IEncounterNatureInfo, Starforged, Ironsworn } from "dataforged";


const starforged: Starforged = {
  assets: require("./starforged/assets.json") as IAssetType[],
  encounters: require("./starforged/encounters.json") as IEncounterStarforged[],
  moves: require("./starforged/moves.json") as IMoveCategory[],
  oracles: require("./starforged/oracles.json") as IOracleCategory[],
  truths: require("./starforged/truths.json") as ISettingTruth[],
}

const ironsworn: Ironsworn = {
  assets: require("./ironsworn/assets.json") as IAssetType[],
  encounters: require("./ironsworn/encounters.json") as IEncounterNatureInfo[],
  moves: require("./ironsworn/moves.json") as IMoveCategory[],
  oracles: require("./ironsworn/oracles.json") as IOracleCategory[],
  // truths: require("./ironsworn/truths.json") as ISettingTruth[],
}

module.exports = {starforged, ironsworn};