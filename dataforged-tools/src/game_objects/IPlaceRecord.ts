import type { GameObjectType, IGameObjectRecordBase } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";

/**
 * @public
 */
export type IPlaceRecord<T extends GameObjectType.Derelict|
GameObjectType.DerelictZone|
GameObjectType.Starship|
GameObjectType.Settlement|
GameObjectType.Planet|
GameObjectType.PrecursorVault, K extends AttributeKey|never = never> = IGameObjectRecordBase<T,
  K|
  AttributeKey.Location|
  AttributeKey.Region|
  AttributeKey.LocationTheme
>;