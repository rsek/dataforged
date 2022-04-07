import type { PlaceType } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";
import type ActorType from "@dataforged/constants/ActorType.js";

export type GameObjectType = (ActorType | PlaceType);

export default interface IGameObjectBase {
  "Object type": GameObjectType;
  "Inherit rolls"?: boolean | undefined;
  [key: string]: string | string[] | undefined | boolean;
}
