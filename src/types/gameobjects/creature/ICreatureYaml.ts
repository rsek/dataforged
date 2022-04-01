import type Behavior from "./Behavior.js";
import type Environment from "./Environment.js";
import type Scale from "./Scale.js";
import type IActorYaml from "../IActorYaml.js";
import type { ActorType } from "../IActorYaml.js";

export default interface ICreatureYaml<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends IActorYaml {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
