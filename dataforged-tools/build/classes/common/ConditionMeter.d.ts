import type { AssetType } from "../assets/AssetType.js";
import { MeterBase } from "./MeterBase.js";
import { MeterAlias } from "../../json_out/index.js";
import type { IConditionMeter, MeterCondition } from "../../json_out/index.js";
import type { IAssetYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class ConditionMeter extends MeterBase implements IConditionMeter {
    $id: IConditionMeter["$id"];
    Name: string;
    Max: number;
    Min: 0;
    "Value": number;
    Conditions: MeterCondition[];
    Aliases?: MeterAlias[] | undefined;
    constructor(json: NonNullable<IAssetYaml["Condition Meter"]>, id: string, assetType: AssetType["$id"]);
}
//# sourceMappingURL=ConditionMeter.d.ts.map