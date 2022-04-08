import type { ActorType } from "@dataforged/constants/ActorType.js";
import type Disposition from "@dataforged/constants/attributes/Disposition.js";
import type Role from "@dataforged/constants/attributes/Role.js";
import type IActorYaml from "@dataforged/interfaces/yaml_in/game_objects/IActorYaml.js";

export default interface ICharacterYaml<R extends Role | undefined, D extends Disposition | undefined> extends IActorYaml {
  "Object type": ActorType.Character;
  Role?: R;
  "Initial Disposition"?: D;
}