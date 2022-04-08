import type { ActorType } from "@dataforged/json_out/game_objects/ActorType.js";
import type { PlaceType } from "@dataforged/json_out/game_objects/PlaceType";

export type GameObjectType = (ActorType | PlaceType);
/**
 * @internal
 */
export interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
