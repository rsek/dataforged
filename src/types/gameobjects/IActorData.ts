import IGameObjectBase from "./IGameObjectBase";

export enum ActorType {
  Character = "Character",
  Creature = "Creature",
  Faction = "Faction",
}

export default interface IActorData extends IGameObjectBase {
  "Object type": ActorType;
}