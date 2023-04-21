import type { Starforged, Ironsworn } from "./types";
import SF from "./starforged/dataforged.json" assert {type: "json"};
import IS from "./ironsworn/datasworn.json" assert {type: "json"};

// for some reason these complain about starforged assets not having the right number of abilities. no Asset constructor throws an error for this on build, the schemas check out, and all IDs are numbered properly, so i don't know what that's about :shrug:

const starforged = SF as unknown as Starforged;

const ironsworn = IS as unknown as Ironsworn;

export {starforged, ironsworn}