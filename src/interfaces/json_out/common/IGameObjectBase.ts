import type { ActorType } from "@dataforged/constants/ActorType.js";
import type { PlaceType } from "@dataforged/constants/PlaceType";

export type GameObjectType = (ActorType | PlaceType);
/**
 * @internal
 */
export interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
