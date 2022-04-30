import type { GameObjectType, IPlaceRecord } from "./index.js";
import type { AttributeKey, SettlementInitialContact } from "../json_out/index.js";
/**
 * @public
 */
export declare type ISettlementRecord<K extends AttributeKey | never = never> = IPlaceRecord<GameObjectType.Settlement, AttributeKey.Authority | AttributeKey.Population | AttributeKey.InitialContact | K> & {
    [AttributeKey.InitialContact]?: SettlementInitialContact | undefined;
};
//# sourceMappingURL=ISettlementRecord.d.ts.map