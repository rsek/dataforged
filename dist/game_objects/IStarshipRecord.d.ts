import type { IPlaceRecord, PlaceType, StarshipInitialContact } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";
export declare type IStarshipRecord<K extends AttributeKey | never = never> = IPlaceRecord<PlaceType.Starship, K | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined;
};
//# sourceMappingURL=IStarshipRecord.d.ts.map