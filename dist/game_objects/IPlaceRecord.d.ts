import type { PlaceType } from "./enum/PlaceType.js";
import type { IGameObjectRecordBase } from "./index.js";
import type { AttributeKey } from "../json_out/index.js";
export declare type IPlaceRecord<T extends PlaceType, K extends AttributeKey | never = never> = IGameObjectRecordBase<T, K | AttributeKey.Location | AttributeKey.Region | AttributeKey.LocationTheme>;
//# sourceMappingURL=IPlaceRecord.d.ts.map