import type { IPlaceRecord } from "@dataforged/game_objects/IPlaceRecord.js";
import type { AttributeKey, PlaceType } from "@dataforged/json_out/index.js";


export type IPlanetRecord = IPlaceRecord<
  PlaceType.Planet,
  AttributeKey.Atmosphere|
  AttributeKey.Life|
  AttributeKey.PlanetaryClass
>;