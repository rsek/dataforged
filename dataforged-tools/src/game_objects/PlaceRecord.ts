import type { GameObjectRecordBase, GameObjectType } from "@game_objects";
import type { AttributeKey } from "@schema_json";

/**
 * @internal
 */
export type PlaceRecord<T extends GameObjectType.Derelict|
GameObjectType.DerelictZone|
GameObjectType.Starship|
GameObjectType.Settlement|
GameObjectType.Planet|
GameObjectType.PrecursorVault, K extends AttributeKey|never = never> = GameObjectRecordBase<T,
  K|
  AttributeKey.Location|
  AttributeKey.Region|
  AttributeKey.LocationTheme
>;