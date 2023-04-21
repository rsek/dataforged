import type { GameObjectType, IPlaceRecord } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";
/**
 * @internal
 */
export type IDerelictZoneRecord = IPlaceRecord<GameObjectType.DerelictZone, AttributeKey.DerelictType>;