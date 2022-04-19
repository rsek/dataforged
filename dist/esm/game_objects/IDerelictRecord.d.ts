import type { IPlaceRecord, ISettlementRecord, SettlementInitialContact, StarshipInitialContact } from "./index.js";
import type { IStarshipRecord } from "./IStarshipRecord.js";
import type { AttributeKey, DerelictType, PlaceType } from "../json_out/index.js";
/**
 * @public
 */
export declare type IDerelictRecord = IPlaceRecord<PlaceType.Derelict, AttributeKey.DerelictType | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict | SettlementInitialContact.Derelict;
};
/**
 * @public
 */
export declare type IDerelictStarshipRecord = Omit<IStarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": PlaceType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Starship;
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};
/**
 * @public
 */
export declare type IDerelictSettlementRecord = Omit<ISettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": PlaceType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Settlement;
    [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};
//# sourceMappingURL=IDerelictRecord.d.ts.map