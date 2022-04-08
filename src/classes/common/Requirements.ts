import AttributeRequirements from "@dataforged/classes/common/Attributes.js";
import type { IRequirements } from "@dataforged/interfaces/json_out/common/IRequirements.js";
import type IRequirementsYaml from "@dataforged/interfaces/yaml_in/common/IRequirementsYaml.js";

export default class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsYaml) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
}
