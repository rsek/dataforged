import type { IOracleUsage } from "@dataforged/json_out/index.js";
import type { ISuggestionsYaml } from "@dataforged/yaml_in/common/index.js";
import type { IRequirementsYaml } from "@dataforged/yaml_in/common/IRequirementsYaml.js";


export interface IOracleUsageYaml extends Omit<Partial<IOracleUsage>, "Suggestions"|"Requires"> {
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
}
