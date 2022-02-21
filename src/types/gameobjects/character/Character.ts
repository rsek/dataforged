import Role from "./Role";
import Actor, { ActorType } from "../Actor";
import Disposition from "./Disposition";

export default interface Character<R extends Role | undefined, D extends Disposition | undefined> extends Actor {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}