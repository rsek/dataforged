//License: MIT
import type { IPlaceRecord, ISettlementRecord, SettlementInitialContact, StarshipInitialContact } from "@game_objects/index.js";
import type { IStarshipRecord } from "@game_objects/IStarshipRecord.js";
import type { AttributeKey, DerelictType, GameObjectType } from "@json_out/index.js";

/**
 * @internal
 */
export type IDerelictRecord = IPlaceRecord<GameObjectType.Derelict, AttributeKey.DerelictType|AttributeKey.InitialContact> & {
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict|SettlementInitialContact.Derelict;
};

/**
 * @internal
 */
export type IDerelictStarshipRecord = Omit<IStarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": GameObjectType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Starship;
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};
/**
 * @internal
 */
export type IDerelictSettlementRecord = Omit<ISettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": GameObjectType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Settlement;
  [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};