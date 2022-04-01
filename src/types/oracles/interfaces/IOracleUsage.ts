
import type IAttributeChoices from "../../gameObjects/IAttributeChoices";
import type IRequirements from "../../general/interfaces/IRequirements.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";

export default interface IOracleUsage {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestions | undefined;
  Requires?: IRequirements | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  "Sets attributes"?: IAttributeChoices[] | undefined;
}
