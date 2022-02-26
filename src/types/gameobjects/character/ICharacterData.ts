import Role from "./Role";
import IActorData, { ActorType } from "../IActorData";
import Disposition from "./Disposition";

export default interface ICharacterData<R extends Role | undefined, D extends Disposition | undefined> extends IActorData {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}