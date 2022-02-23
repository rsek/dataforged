import { ActorType } from "./IActorData";
import AttributeHash from "./AttributeHash";
import { PlaceType } from "./IPlaceData";

export type GameObjectType = (ActorType | PlaceType);

export function isGameObjectType(str: string | undefined): str is GameObjectType {
  return true;
}

export function isGameObjectData(json: any): json is IGameObjectBase {
  if (typeof json != "object" || Array.isArray(json)) {
    return false;
  }
  if (isGameObjectType(json["Object type"])) {
    return false;
  }
  // TODO: check for valid attributes
  // let keys = Object.keys(json);
  // let values = Object.values(json);
  return true;
}

export default interface IGameObjectBase {
  "Object type": GameObjectType;
  [key: string]: string | string[] | undefined;
}
