import type { ActorType } from "@dataforged/constants/ActorType.js";
import type Behavior from "@dataforged/constants/attributes/Behavior.js";
import type Environment from "@dataforged/constants/attributes/Environment.js";
import type Scale from "@dataforged/constants/attributes/Scale.js";
import type IActorYaml from "@dataforged/interfaces/yaml_in/game_objects/IActorYaml.js";

export default interface ICreatureYaml<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends IActorYaml {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
