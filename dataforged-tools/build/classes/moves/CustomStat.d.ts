import { CustomStatOption } from "../index.js";
import type { ICustomStat, IMoveTriggerOptionBase } from "../../json_out/index.js";
import type { ICustomStatYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class CustomStat implements ICustomStat {
    $id: ICustomStat["$id"];
    Name: string;
    Options: CustomStatOption[];
    constructor(json: ICustomStatYaml, parentId: IMoveTriggerOptionBase["$id"]);
}
//# sourceMappingURL=CustomStat.d.ts.map