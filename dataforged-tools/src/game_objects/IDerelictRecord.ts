import type { IPlaceRecord, ISettlementRecord, SettlementInitialContact, StarshipInitialContact } from "@game_objects/index.js";
import type { IStarshipRecord } from "@game_objects/IStarshipRecord.js";
import type { AttributeKey, DerelictType, PlaceType } from "@json_out/index.js";

/**
 * @public
 */
export type IDerelictRecord = IPlaceRecord<PlaceType.Derelict, AttributeKey.DerelictType|AttributeKey.InitialContact> & {
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict|SettlementInitialContact.Derelict;
};

/**
 * @public
 */
export type IDerelictStarshipRecord = Omit<IStarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": PlaceType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Starship;
  [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};
/**
 * @public
 */
export type IDerelictSettlementRecord = Omit<ISettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
  "Object type": PlaceType.Derelict;
  [AttributeKey.DerelictType]: DerelictType.Settlement;
  [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};