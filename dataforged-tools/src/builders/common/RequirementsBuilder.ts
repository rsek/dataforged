import { AttributeRequirementsBuilder } from "@builders";
import type { Requirements } from "@schema_json";
import type { YamlRequirements } from "@schema_yaml";

/**
 * @internal
 */
export class RequirementsBuilder implements Requirements {
  Attributes: AttributeRequirementsBuilder;
  constructor(json: YamlRequirements) {
    this.Attributes = new AttributeRequirementsBuilder(json.Attributes);
  }
};
