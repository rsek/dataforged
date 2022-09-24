/* eslint-disable no-restricted-imports */
// export * from "@utils/index.js";
export * from "./schema_json";
export * from "./schema_yaml";
export * from "./builders";
export * from "./constants";
export * from "./game_objects";
export * from "./utils";
import IS from "./json/ironsworn/datasworn.json" assert { type: "json" };
import SF from "./json/starforged/dataforged.json" assert { type: "json" };
/**
 * @public
 */
const starforged = SF;
/**
 * @public
 */
const ironsworn = IS;
export { starforged, ironsworn };
//# sourceMappingURL=index.js.map