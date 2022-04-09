import { Counter } from "../../../dist/classes/common/Counter.js";
import type { AssetConditionMeterId, AssetTypeId, IConditionMeter, MeterCondition } from "../../../dist/json_out/index.js";
import { MeterAlias } from "../../../dist/json_out/index.js";
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