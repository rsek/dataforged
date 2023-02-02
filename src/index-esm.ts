import * as legacyIdMap from "./legacy_id_map.json"


// for some reason these complain about ironsworn assets not having the right number of abilities. no Asset constructor throws an error for this on build, the schemas check out, and all IDs are numbered properly, so i don't know what that's about :shrug:


const LEGACY_ID_MAP = legacyIdMap as Record<string,string>;

export { LEGACY_ID_MAP }