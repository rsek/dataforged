import IActorYaml, { ActorType } from "../IActorYaml";
import Behavior from "./Behavior";
import Environment from "./Environment";
import Scale from "./Scale";

export default interface ICreatureYaml<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends IActorYaml {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
