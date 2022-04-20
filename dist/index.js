const starforged = {
  assets: require("./ironsworn/assets.json"),
  encounters: require("./ironsworn/encounters.json"),
  moves: require("./ironsworn/moves.json"),
  oracles: require("./ironsworn/oracles.json"),
  truths: require("./ironsworn/setting_truths.json"),
};
const ironsworn = {
  assets: require("./starforged/assets.json"),
  encounters: require("./starforged/encounters.json"),
  moves: require("./starforged/moves.json"),
  oracles: require("./starforged/oracles.json"),
  // truths: require("./starforged/setting_truths.json")
};
module.exports = { starforged, ironsworn };