//License: MIT
import { AttributeRequirements } from "@classes/index.js";
import type { IRequirements } from "@json_out/index.js";
import type { IRequirementsYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsYaml) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
};
