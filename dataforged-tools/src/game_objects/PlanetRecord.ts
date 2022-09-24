import type { PlaceRecord } from "@game_objects";
import type { AttributeKey, GameObjectType } from "@schema_json";

/**
 * @internal
 */
export type PlanetRecord = PlaceRecord<
  GameObjectType.Planet,
  AttributeKey.Atmosphere|
  AttributeKey.Life|
  AttributeKey.PlanetaryClass
>;