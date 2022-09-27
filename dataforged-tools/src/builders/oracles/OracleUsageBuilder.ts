import { RequirementsBuilder, SuggestionsBuilder } from "@builders";
import type { AttributeChoices , OracleUsage, Requirements, Suggestions, YamlOracleUsage } from "@schema";

/**
 * @internal
 */
export class OracleUsageBuilder implements OracleUsage {
  Initial?: boolean | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  Suggestions?: Suggestions | undefined;
  Requires?: Requirements | undefined;
  "Allow duplicates"?: boolean | undefined;
  "Sets"?: AttributeChoices[] | undefined;
  constructor(yaml: YamlOracleUsage) {
    // if (!is<OracleUsageData>(json)) {
    //   throw new Error();
    // }
    this.Initial = yaml.Initial;
    this["Max rolls"] = yaml["Max rolls"];
    this.Repeatable = yaml.Repeatable;
    this["Allow duplicates"] = yaml["Allow duplicates"] ?? false;
    if (yaml.Suggestions) {
      this.Suggestions = new SuggestionsBuilder(yaml.Suggestions);
    }
    if (yaml.Requires) {
      this.Requires = new RequirementsBuilder(yaml.Requires);
    }
    // this["Sets attributes"] = json["Sets attributes"];
  }
}
