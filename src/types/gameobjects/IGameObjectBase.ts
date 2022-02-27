import { ActorType } from "./IActorYaml";
import AttributeHash from "./AttributeHash";
import { PlaceType } from "./IPlaceYaml";

export type GameObjectType = (ActorType | PlaceType);

export default interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
