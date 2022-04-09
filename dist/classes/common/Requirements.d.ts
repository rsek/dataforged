import { AttributeRequirements } from "../../../dist/classes/common/AttributeRequirements.js";
import type { IRequirements } from "@dataforged/json_out/index.js";
import type { IRequirementsYaml } from "../../../dist/yaml_in/index.js";
export declare class Requirements implements IRequirements {
    Attributes: AttributeRequirements;
    constructor(json: IRequirementsYaml);
}
//# sourceMappingURL=Requirements.d.ts.map