import AttributeHash from "./AttributeHash.js";
import type { ActorType } from "./IActorYaml.js";
import type { PlaceType } from "./IPlaceYaml.js";

export type GameObjectType = (ActorType | PlaceType);

export default interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
