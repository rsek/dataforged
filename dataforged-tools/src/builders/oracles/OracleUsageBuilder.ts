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
