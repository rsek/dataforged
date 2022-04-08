import type { IAttributeChoices } from "@dataforged/interfaces/json_out/common/IAttributeChoices.js";
import type { IHasRequirements, IHasSuggestions } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IRequirements } from "@dataforged/interfaces/json_out/common/IRequirements.js";
import type { ISuggestions } from "@dataforged/interfaces/json_out/common/ISuggestions.js";

export interface IOracleUsage extends Partial<IHasRequirements & IHasSuggestions> {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestions | undefined;
  Requires?: IRequirements | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  "Allow duplicates"?: boolean | undefined;
  "Sets attributes"?: IAttributeChoices[] | undefined;
}
