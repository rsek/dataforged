"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const starforged = {
    assets: require("./starforged/assets.json"),
    encounters: require("./starforged/encounters.json"),
    moves: require("./starforged/moves.json"),
    oracles: require("./starforged/oracles.json"),
    truths: require("./starforged/truths.json"),
};
const ironsworn = {
    assets: require("./ironsworn/assets.json"),
    encounters: require("./ironsworn/encounters.json"),
    moves: require("./ironsworn/moves.json"),
    oracles: require("./ironsworn/oracles.json"),
    // truths: require("./ironsworn/truths.json") as ISettingTruth[],
};
module.exports = { starforged, ironsworn };
