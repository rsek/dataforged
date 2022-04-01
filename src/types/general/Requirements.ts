
import _ from "lodash-es";
import AttributeRequirements from "./Attributes.js";
import type IRequirements from "./interfaces/IRequirements.js";
import type IRequirementsYaml from "./interfaces/IRequirementsYaml.js";

export default class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsYaml) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
}
