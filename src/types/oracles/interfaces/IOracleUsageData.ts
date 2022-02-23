
import { AttributeKey } from "../../gameobjects/IAttribute";
import IRequirements from "../../general/interfaces/IRequirements";
import IRequirementsData from "../../general/interfaces/IRequirementsData";
import ISuggestions from "../../general/interfaces/ISuggestions";
import ISuggestionsData from "../../general/interfaces/ISuggestionsData";


export default interface IOracleUsageData {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestionsData | undefined;
  Requires?: IRequirementsData | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  "Sets attributes"?: AttributeKey[] | undefined;
}
