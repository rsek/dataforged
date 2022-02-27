import IActorYaml, { ActorType } from "../IActorYaml";
import Dominion from "./Dominion";
import FactionType from "./FactionType";
import FringeGroup from "./FringeGroup";
import Guild from "./Guild";
import Influence from "./Influence";
import Leadership from "./Leadership";

export type FactionOption = Dominion | FringeGroup | Guild;

export default interface IFactionData<T extends FactionOption | undefined> extends IActorYaml {
  "Object type": ActorType.Faction;
  "Faction Type"?: T extends Dominion ? FactionType.Dominion : T extends FringeGroup ? FactionType.FringeGroup : T extends Guild ? FactionType.Guild : undefined;
  Influence?: Influence;
  Dominion: T extends Dominion ? T : never;
  Leadership: T extends Dominion ? Leadership : never;
  Guild: T extends Guild ? T : never;
  "Fringe Group": T extends FringeGroup ? T : never;
  // most of these can have multiple results, but for the purposes of typechecking game object json, a single string is enough.
}
