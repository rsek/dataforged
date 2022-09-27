import { AttributeRequirementsBuilder } from "@builders";
import type { Requirements , YamlRequirements } from "@schema";

/**
 * @internal
 */
export class RequirementsBuilder implements Requirements {
  Attributes: AttributeRequirementsBuilder;
  constructor(yaml: YamlRequirements) {
    this.Attributes = new AttributeRequirementsBuilder(yaml.Attributes);
  }
};
