
import _ from "lodash";
import IRequirements from "./interfaces/IRequirements";
import IRequirementsYaml from "./interfaces/IRequirementsYaml";
import AttributeRequirements from "./Attributes";

export default class Requirements implements IRequirements {
  Attributes: AttributeRequirements;
  constructor(json: IRequirementsYaml) {
    this.Attributes = new AttributeRequirements(json.Attributes);
  }
}
