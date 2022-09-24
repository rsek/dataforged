import type { AttributeChoices, OracleUsage } from "@schema_json";
import type { YamlOracleUsage } from "@schema_yaml";
import { RequirementsBuilder , SuggestionsBuilder } from "@builders";

/**
 * @internal
 */
export class OracleUsageBuilder implements OracleUsage {
  Initial?: boolean | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  Suggestions?: SuggestionsBuilder | undefined;
  Requires?: RequirementsBuilder | undefined;
  "Allow duplicates"?: boolean | undefined;
  "Sets"?: AttributeChoices[] | undefined;
  constructor(json: YamlOracleUsage) {
    // if (!is<OracleUsageData>(json)) {
    //   throw new Error();
    // }
    this.Initial = json.Initial;
    this["Max rolls"] = json["Max rolls"];
    this.Repeatable = json.Repeatable;
    this["Allow duplicates"] = json["Allow duplicates"] ?? false;
    if (json.Suggestions) {
      this.Suggestions = new SuggestionsBuilder(json.Suggestions);
    }
    if (json.Requires) {
      this.Requires = new RequirementsBuilder(json.Requires);
    }
    // this["Sets attributes"] = json["Sets attributes"];
  }
}
