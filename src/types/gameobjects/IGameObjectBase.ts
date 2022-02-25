import { ActorType } from "./IActorData";
import AttributeHash from "./AttributeHash";
import { PlaceType } from "./IPlaceData";

export type GameObjectType = (ActorType | PlaceType);

export default interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
