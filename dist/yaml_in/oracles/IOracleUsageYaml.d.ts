import type { IOracleUsage } from "@dataforged/json_out/index.js";
import type { ISuggestionsYaml } from "../../../dist/yaml_in/common/index.js";
import type { IRequirementsYaml } from "../../../dist/yaml_in/common/IRequirementsYaml.js";
export interface IOracleUsageYaml extends Omit<Partial<IOracleUsage>, "Suggestions" | "Requires"> {
    Suggestions?: ISuggestionsYaml | undefined;
    Requires?: IRequirementsYaml | undefined;
}
//# sourceMappingURL=IOracleUsageYaml.d.ts.map