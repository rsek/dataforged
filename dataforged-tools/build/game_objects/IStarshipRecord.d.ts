import type { IPlaceRecord, PlaceType, StarshipInitialContact } from "./index.js";
import type { AttributeKey } from "../json_out/index.js";
/**
 * @public
 */
export declare type IStarshipRecord<K extends AttributeKey | never = never> = IPlaceRecord<PlaceType.Starship, K | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined;
};
//# sourceMappingURL=IStarshipRecord.d.ts.map