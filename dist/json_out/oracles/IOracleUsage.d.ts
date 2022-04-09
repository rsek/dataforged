import type { IAttributeChoices, IHasRequirements, IHasSuggestions, IRequirements, ISuggestions } from "../index.js";
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
//# sourceMappingURL=IOracleUsage.d.ts.map