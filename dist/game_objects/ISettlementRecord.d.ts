import type { IPlaceRecord, PlaceType } from "@dataforged/game_objects/index.js";
import type { AttributeKey, SettlementInitialContact } from "@dataforged/json_out/index.js";
export declare type ISettlementRecord<K extends AttributeKey | never = never> = IPlaceRecord<PlaceType.Settlement, AttributeKey.Authority | AttributeKey.Population | AttributeKey.InitialContact | K> & {
    [AttributeKey.InitialContact]?: SettlementInitialContact | undefined;
};
//# sourceMappingURL=ISettlementRecord.d.ts.map