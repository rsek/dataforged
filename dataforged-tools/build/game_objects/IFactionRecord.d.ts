import type { IActorRecord } from "./IActorRecord.js";
import type { FactionType, GameObjectType } from "./index.js";
import type { AttributeKey } from "../json_out/index.js";
/**
 * @public
 */
export declare type IFactionRecord = IActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence>;
/**
 * @public
 */
export declare type IFactionGuildRecord = IActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Guild> & {
    [AttributeKey.FactionType]: FactionType.Guild;
};
/**
 * @public
 */
export declare type IFactionFringeGroupRecord = IActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.FringeGroup> & {
    [AttributeKey.FactionType]: FactionType.FringeGroup;
};
/**
 * @public
 */
export declare type IFactionDominionRecord = IActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Leadership | AttributeKey.Dominion> & {
    [AttributeKey.FactionType]: FactionType.Dominion;
};
//# sourceMappingURL=IFactionRecord.d.ts.map