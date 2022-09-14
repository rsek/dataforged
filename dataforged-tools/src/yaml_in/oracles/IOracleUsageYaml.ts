import type { IOracleUsage } from "@json_out/index.js";
import type { IRollTemplateYaml, ISuggestionsYaml } from "@yaml_in/common/index.js";
import type { IRequirementsYaml } from "@yaml_in/common/IRequirementsYaml.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleUsageYaml extends YamlStub<IOracleUsage, "","Suggestions"|"Requires"|"Roll template"> {
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
  "Roll template"?: IRollTemplateYaml | undefined;
}
