import type { IPlaceRecord, ISettlementRecord, SettlementInitialContact, StarshipInitialContact } from "./index.js";
import type { IStarshipRecord } from "./IStarshipRecord.js";
import type { AttributeKey, DerelictType, GameObjectType } from "../json_out/index.js";
/**
 * @internal
 */
export declare type IDerelictRecord = IPlaceRecord<GameObjectType.Derelict, AttributeKey.DerelictType | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict | SettlementInitialContact.Derelict;
};
/**
 * @internal
 */
export declare type IDerelictStarshipRecord = Omit<IStarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Starship;
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};
/**
 * @internal
 */
export declare type IDerelictSettlementRecord = Omit<ISettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Settlement;
    [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};
//# sourceMappingURL=IDerelictRecord.d.ts.map