import type { ActorType, Behavior, Environment, Scale } from "@dataforged/json_out/index.js";
import type { IActorYaml } from "@dataforged/yaml_in/index.js";

export interface ICreatureYaml<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends IActorYaml {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
