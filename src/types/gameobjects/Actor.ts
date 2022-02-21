import IGameObjectData from "./IGameObjectData";

export enum ActorType {
  Character = "Character",
  Creature = "Creature",
  Faction = "Faction",
}

export default interface Actor extends IGameObjectData {
  "Object type": ActorType;
}