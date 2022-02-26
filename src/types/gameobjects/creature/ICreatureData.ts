import IActorData, { ActorType } from "../IActorData";
import Behavior from "./Behavior";
import Environment from "./Environment";
import Scale from "./Scale";

export default interface ICreatureData<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends IActorData {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
