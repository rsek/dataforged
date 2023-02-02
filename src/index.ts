// import type { Starforged, Ironsworn } from "./types/index.js";

// const starforged = require("./starforged/dataforged.json") as Starforged;
// const ironsworn = require("./ironsworn/datasworn.json") as Ironsworn;
const LEGACY_ID_MAP = require("./legacy_id_map.json") as Record<string,string>;

module.exports = { LEGACY_ID_MAP};