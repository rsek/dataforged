import { ActorType } from "./Actor";
import { PlaceType } from "./Place";

export type GameObjectType = (ActorType | PlaceType);

export function isGameObjectType(str: string | undefined): str is GameObjectType {
  return true;
}

export function isGameObjectData(json: any): json is IGameObjectData {
  if (typeof json != "object" || Array.isArray(json)) {
    return false;
  }
  if (isGameObjectType(json["Object type"])) {
    return false;
  }
  // let keys = Object.keys(json);
  // let values = Object.values(json);
  return true;
}

export default interface IGameObjectData {
  [key: string]: string | string[] | undefined;
  "Object type": GameObjectType;
}

