import type { GameObjectType, IPlaceRecord, StarshipInitialContact } from "./index.js";
import type { AttributeKey } from "../json_out/index.js";
/**
 * @public
 */
export declare type IStarshipRecord<K extends AttributeKey | never = never> = IPlaceRecord<GameObjectType.Starship, K | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined;
};
//# sourceMappingURL=IStarshipRecord.d.ts.map