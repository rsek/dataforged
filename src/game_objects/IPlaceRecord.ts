import type { PlaceType } from "@game_objects/enum/PlaceType.js";
import type { IGameObjectRecordBase } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";

/**
 * @public
 */
export type IPlaceRecord<T extends PlaceType, K extends AttributeKey|never = never> = IGameObjectRecordBase<T,
  K|
  AttributeKey.Location|
  AttributeKey.Region|
  AttributeKey.LocationTheme
>;