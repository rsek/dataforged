
import IAttributeChoices from "../../gameobjects/IAttributeChoices";
import IRequirements from "../../general/interfaces/IRequirements";
import ISuggestions from "../../general/interfaces/ISuggestions";


export default interface IOracleUsage {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestions | undefined;
  Requires?: IRequirements | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  "Sets attributes"?: IAttributeChoices[] | undefined;
}
