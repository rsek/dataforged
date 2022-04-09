import type { IActorRecord } from "../../dist/game_objects/IActorRecord.js";
import type { ActorType, FactionType } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";
export declare type IFactionRecord = IActorRecord<ActorType.Faction, AttributeKey.FactionType | AttributeKey.Influence>;
export declare type IFactionGuildRecord = IActorRecord<ActorType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Guild> & {
    [AttributeKey.FactionType]: FactionType.Guild;
};
export declare type IFactionFringeGroupRecord = IActorRecord<ActorType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.FringeGroup> & {
    [AttributeKey.FactionType]: FactionType.FringeGroup;
};
export declare type IFactionDominionRecord = IActorRecord<ActorType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Leadership | AttributeKey.Dominion> & {
    [AttributeKey.FactionType]: FactionType.Dominion;
};
//# sourceMappingURL=IFactionRecord.d.ts.map