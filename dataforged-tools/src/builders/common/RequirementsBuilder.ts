import { AttributeRequirementsBuilder } from "@builders";
import type { YamlRequirements } from "@schema_yaml";
import type { Requirements } from "@schema_json";

/**
 * @internal
 */
export class RequirementsBuilder implements Requirements {
  Attributes: AttributeRequirementsBuilder;
  constructor(json: YamlRequirements) {
    this.Attributes = new AttributeRequirementsBuilder(json.Attributes);
  }
};
