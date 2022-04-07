import type IActorYaml from "@dataforged/interfaces/yaml_in/game_objects/IActorYaml.js";
import type ActorType from "@dataforged/constants/ActorType.js";
import type Dominion from "@dataforged/constants/attributes/Dominion.js";
import type FactionType from "@dataforged/constants/attributes/FactionType.js";
import type FringeGroup from "@dataforged/constants/attributes/FringeGroup.js";
import type Guild from "@dataforged/constants/attributes/Guild.js";
import type Influence from "@dataforged/constants/attributes/Influence.js";
import type Leadership from "@dataforged/constants/attributes/Leadership.js";

export type FactionOption = Dominion | FringeGroup | Guild;

export default interface IFactionYaml<T extends FactionOption | undefined> extends IActorYaml {
  "Object type": ActorType.Faction;
  "Faction Type"?: T extends Dominion ? FactionType.Dominion : T extends FringeGroup ? FactionType.FringeGroup : T extends Guild ? FactionType.Guild : undefined;
  Influence?: Influence;
  Dominion: T extends Dominion ? T : never;
  Leadership: T extends Dominion ? Leadership : never;
  Guild: T extends Guild ? T : never;
  "Fringe Group": T extends FringeGroup ? T : never;
  // most of these can have multiple results, but for the purposes of typechecking game object json, a single string is enough.
}
