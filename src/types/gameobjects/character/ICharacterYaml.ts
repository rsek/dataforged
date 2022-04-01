import type Disposition from "./Disposition.js";
import type Role from "./Role.js";
import type { ActorType } from "../IActorYaml.js";
import type IActorYaml from "../IActorYaml.js";

export default interface ICharacterYaml<R extends Role | undefined, D extends Disposition | undefined> extends IActorYaml {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}