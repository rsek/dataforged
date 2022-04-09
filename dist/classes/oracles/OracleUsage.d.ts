import { Requirements } from "@dataforged/classes/common/Requirements.js";
import { Suggestions } from "@dataforged/classes/common/Suggestions.js";
import type { IAttributeChoices, IOracleUsage } from "@dataforged/json_out/index.js";
import type { IOracleUsageYaml } from "../../../dist/yaml_in/oracles/IOracleUsageYaml.js";
export declare class OracleUsage implements IOracleUsage {
    Initial?: boolean | undefined;
    "Min rolls"?: number | undefined;
    "Max rolls"?: number | undefined;
    Repeatable?: boolean | undefined;
    Suggestions?: Suggestions | undefined;
    Requires?: Requirements | undefined;
    "Allow duplicates"?: boolean | undefined;
    "Sets attributes"?: IAttributeChoices[] | undefined;
    constructor(json: IOracleUsageYaml);
}
//# sourceMappingURL=OracleUsage.d.ts.map