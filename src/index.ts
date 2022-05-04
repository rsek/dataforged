import type { Starforged, Ironsworn } from "./types";

const starforged = require("./starforged/dataforged.json") as Starforged;
const ironsworn = require("./ironsworn/datasworn.json") as Ironsworn;

module.exports = {starforged, ironsworn};