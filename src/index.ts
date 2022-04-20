import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth, IEncounterNatureInfo } from "dataforged";


const ironsworn = {
  assets: require("./ironsworn/assets.json") as IAssetType[],
  encounters: require("./ironsworn/encounters.json") as IEncounterStarforged[],
  moves: require("./ironsworn/moves.json") as IMoveCategory[],
  oracles: require("./ironsworn/oracles.json") as IOracleCategory[],
  truths: require("./ironsworn/setting_truths.json") as ISettingTruth[],
}

const starforged = {
  assets: require("./starforged/assets.json") as IAssetType[],
  encounters: require("./starforged/encounters.json") as IEncounterNatureInfo[],
  moves: require("./starforged/moves.json") as IMoveCategory[],
  oracles: require("./starforged/oracles.json") as IOracleCategory[],
  // truths: require("./starforged/setting_truths.json")
}

module.exports = {starforged, ironsworn};