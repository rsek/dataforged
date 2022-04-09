import { AttributeRequirements } from "@dataforged/classes/common/AttributeRequirements.js";
import type { IRequirements } from "@dataforged/json_out/index.js";
import type { IRequirementsYaml } from "@dataforged/yaml_in/index.js";

export class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsYaml) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
};
