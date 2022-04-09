import type { IPlaceRecord, ISettlementRecord, SettlementInitialContact, StarshipInitialContact } from "@dataforged/game_objects/index.js";
import type { IStarshipRecord } from "@dataforged/game_objects/IStarshipRecord.js";
import type { AttributeKey, DerelictType, PlaceType } from "@dataforged/json_out/index.js";

export type IDerelictRecord = IPlaceRecord<PlaceType.Derelict, AttributeKey.DerelictType|AttributeKey.InitialContact> & {
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict|SettlementInitialContact.Derelict;
};

export type IDerelictStarshipRecord = Omit<IStarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": PlaceType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Starship;
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};

export type IDerelictSettlementRecord = Omit<ISettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": PlaceType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Settlement;
  [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};