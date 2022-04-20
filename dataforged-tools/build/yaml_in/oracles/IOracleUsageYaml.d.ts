import type { IOracleUsage } from "../../json_out/index.js";
import type { ISuggestionsYaml } from "../common/index.js";
import type { IRequirementsYaml } from "../common/IRequirementsYaml.js";
export interface IOracleUsageYaml extends Omit<Partial<IOracleUsage>, "Suggestions" | "Requires"> {
    Suggestions?: ISuggestionsYaml | undefined;
    Requires?: IRequirementsYaml | undefined;
}
//# sourceMappingURL=IOracleUsageYaml.d.ts.map