import { AttributeRequirementsBuilder } from "@builders";
import type { Requirements , YamlRequirements } from "@schema";

/**
 * @internal
 */
export class RequirementsBuilder implements Requirements {
  Attributes: AttributeRequirementsBuilder;
  constructor(json: YamlRequirements) {
    this.Attributes = new AttributeRequirementsBuilder(json.Attributes);
  }
};
