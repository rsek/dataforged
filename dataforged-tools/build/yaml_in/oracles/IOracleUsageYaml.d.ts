import type { IOracleUsage } from "../../json_out/index.js";
import type { IRollTemplateYaml, ISuggestionsYaml } from "../common/index.js";
import type { IRequirementsYaml } from "../common/IRequirementsYaml.js";
import type { YamlStub } from "../index.js";
/**
 * @internal
 */
export interface IOracleUsageYaml extends YamlStub<IOracleUsage, "", "Suggestions" | "Requires" | "Roll template"> {
    Suggestions?: ISuggestionsYaml | undefined;
    Requires?: IRequirementsYaml | undefined;
    "Roll template"?: IRollTemplateYaml | undefined;
}
//# sourceMappingURL=IOracleUsageYaml.d.ts.map