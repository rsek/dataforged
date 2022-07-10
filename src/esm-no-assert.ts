import type { Starforged, Ironsworn } from "./types/index.js"

import * as SF from "./starforged/dataforged.json";
import * as IS from "./ironsworn/datasworn.json";

const starforged = SF as Starforged;

const ironsworn = IS as unknown as Ironsworn;

export {starforged, ironsworn}