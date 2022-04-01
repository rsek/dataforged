
import type IRequirementsYaml from "../../../general/interfaces/IRequirementsYaml.js";
import type ISuggestionsYaml from "../../../general/interfaces/ISuggestionsYaml.js";

export default interface IOracleUsageYaml {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
}
