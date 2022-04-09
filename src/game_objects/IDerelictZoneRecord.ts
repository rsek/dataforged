import type { IPlaceRecord, PlaceType } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";

export type IDerelictZoneRecord = IPlaceRecord<PlaceType.DerelictZone, AttributeKey.DerelictType>;