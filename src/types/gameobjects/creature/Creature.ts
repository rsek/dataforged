import Actor, { ActorType } from "../Actor";
import Behavior from "./Behavior";
import Environment from "./Environment";
import Scale from "./Scale";

export default interface Creature<E extends Environment | undefined, B extends Behavior | undefined, S extends Scale | undefined> extends Actor {
  "Object type": ActorType.Creature;
  Environment?: E;
  Scale?: S;
  "Encountered Behavior"?: B;
}
