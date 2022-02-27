
import IRequirementsYaml from "../../../general/interfaces/IRequirementsYaml";
import ISuggestionsYaml from "../../../general/interfaces/ISuggestionsYaml";

export default interface IOracleUsageYaml {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestionsYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
}
