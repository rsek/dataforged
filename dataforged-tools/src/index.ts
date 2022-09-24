/* eslint-disable no-restricted-imports */
// export * from "@utils/index.js";
export * from "@schema_json";
export * from "@schema_yaml";
export * from "@builders";
export * from "@constants";
export * from "@game_objects";
export * from "@utils";
import type { Ironsworn, Starforged } from "@schema_json/GameData.js";

import IS from "./json/ironsworn/datasworn.json" assert {type: "json"};
import SF from "./json/starforged/dataforged.json" assert {type: "json"};

/**
 * @public
 */
const starforged = SF as unknown as Starforged;
/**
 * @public
 */
const ironsworn = IS as unknown as Ironsworn;

export { starforged, ironsworn };