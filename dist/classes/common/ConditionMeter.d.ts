import { Counter } from "./Counter.js";
import type { AssetConditionMeterId, AssetTypeId } from "../../json_out/assets/index.js";
import { MeterAlias } from "../../json_out/common/index.js";
import type { IConditionMeter, MeterCondition } from "../../json_out/common/index.js";
export declare class ConditionMeter extends Counter implements IConditionMeter {
    $id: AssetConditionMeterId;
    Name: string;
    Max: number;
    Min: number;
    "Starting Value": number;
    Conditions: MeterCondition[];
    Aliases?: MeterAlias[] | undefined;
    constructor(json: IConditionMeter, id: string, assetType: AssetTypeId);
}
//# sourceMappingURL=ConditionMeter.d.ts.map