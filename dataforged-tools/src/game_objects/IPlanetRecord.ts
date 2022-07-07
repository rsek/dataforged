import type { IPlaceRecord } from "@game_objects/IPlaceRecord.js";
import type { AttributeKey, GameObjectType } from "@json_out/index.js";

/**
 * @internal
 */
export type IPlanetRecord = IPlaceRecord<
  GameObjectType.Planet,
  AttributeKey.Atmosphere|
  AttributeKey.Life|
  AttributeKey.PlanetaryClass
>;