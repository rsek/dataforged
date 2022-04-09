import type { PlaceType } from "../../dist/game_objects/enum/PlaceType.js";
import type { IGameObjectRecordBase } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";
export declare type IPlaceRecord<T extends PlaceType, K extends AttributeKey | never = never> = IGameObjectRecordBase<T, K | AttributeKey.Location | AttributeKey.Region | AttributeKey.LocationTheme>;
//# sourceMappingURL=IPlaceRecord.d.ts.map