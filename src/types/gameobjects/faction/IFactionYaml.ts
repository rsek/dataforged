import type Dominion from "./Dominion.js";
import type FactionType from "./FactionType.js";
import type FringeGroup from "./FringeGroup.js";
import type Guild from "./Guild.js";
import type Influence from "./Influence.js";
import type Leadership from "./Leadership.js";
import type IActorYaml from "../IActorYaml.js";
import type { ActorType } from "../IActorYaml.js";

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
