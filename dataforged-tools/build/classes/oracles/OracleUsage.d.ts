import { Requirements, Suggestions } from "../index.js";
import type { IAttributeChoices, IOracleUsage } from "../../json_out/index.js";
import type { IOracleUsageYaml } from "../../yaml_in/oracles/IOracleUsageYaml.js";
/**
 * @internal
 */
export declare class OracleUsage implements IOracleUsage {
    Initial?: boolean | undefined;
    "Max rolls"?: number | undefined;
    Repeatable?: boolean | undefined;
    Suggestions?: Suggestions | undefined;
    Requires?: Requirements | undefined;
    "Allow duplicates"?: boolean | undefined;
    "Sets"?: IAttributeChoices[] | undefined;
    constructor(json: IOracleUsageYaml);
}
//# sourceMappingURL=OracleUsage.d.ts.map