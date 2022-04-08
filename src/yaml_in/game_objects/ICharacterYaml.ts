import type { ActorType, Disposition, Role } from "@dataforged/json_out/index.js";
import type { IActorYaml } from "@dataforged/yaml_in/index.js";


export interface ICharacterYaml<R extends Role | undefined, D extends Disposition | undefined> extends IActorYaml {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}