import type { IOracleUsage } from "@dataforged/interfaces/json_out/oracles/IOracleUsage.js";
import type IRequirementsYaml from "@dataforged/interfaces/yaml_in/common/IRequirementsYaml.js";
import type ISuggestionsYaml from "@dataforged/interfaces/yaml_in/common/ISuggestionsYaml.js";

export default interface IOracleUsageYaml extends Omit<Partial<IOracleUsage>, "Suggestions"|"Requires"> {
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
}
