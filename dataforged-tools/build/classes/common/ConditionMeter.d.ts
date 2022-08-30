import type { AssetType } from "../assets/AssetType.js";
import { Meter } from "./Meter.js";
import { MeterAlias } from "../../json_out/index.js";
import type { IConditionMeter, MeterCondition } from "../../json_out/index.js";
import type { IConditionMeterYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class ConditionMeter extends Meter implements IConditionMeter {
    Value: number;
    Min: 0;
    Conditions: MeterCondition[];
    Aliases?: MeterAlias[] | undefined;
    constructor(json: IConditionMeterYaml, id: string, assetType: AssetType["$id"]);
}
//# sourceMappingURL=ConditionMeter.d.ts.map