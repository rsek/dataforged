import Role from "./Role";
import IActorYaml, { ActorType } from "../IActorYaml";
import Disposition from "./Disposition";

export default interface ICharacterData<R extends Role | undefined, D extends Disposition | undefined> extends IActorYaml {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}