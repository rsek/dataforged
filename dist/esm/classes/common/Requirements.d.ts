import { AttributeRequirements } from "../index.js";
import type { IRequirements } from "../../json_out/index.js";
import type { IRequirementsYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class Requirements implements IRequirements {
    Attributes: AttributeRequirements;
    constructor(json: IRequirementsYaml);
}
//# sourceMappingURL=Requirements.d.ts.map