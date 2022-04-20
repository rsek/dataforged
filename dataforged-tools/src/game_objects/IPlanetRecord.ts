import type { IPlaceRecord } from "@game_objects/IPlaceRecord.js";
import type { AttributeKey, PlaceType } from "@json_out/index.js";

/**
 * @public
 */
export type IPlanetRecord = IPlaceRecord<
  PlaceType.Planet,
  AttributeKey.Atmosphere|
  AttributeKey.Life|
  AttributeKey.PlanetaryClass
>;