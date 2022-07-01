//License: MIT
import type { IOracleUsage } from "@json_out/index.js";
import type { ISuggestionsYaml } from "@yaml_in/common/index.js";
import type { IRequirementsYaml } from "@yaml_in/common/IRequirementsYaml.js";

/**
 * @internal
 */
export interface IOracleUsageYaml extends Omit<Partial<IOracleUsage>, "Suggestions"|"Requires"> {
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
}
