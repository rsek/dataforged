import type { IAttributeChoices, IHasRequirements, IHasSuggestions, IRequirements, ISuggestions } from "../index.js";
/**
 * Describes the recommended usage of this item.
 * @public
 */
export interface IOracleUsage extends Partial<IHasRequirements & IHasSuggestions> {
    /**
     * Whether this table should be included in the initial oracle rolls when generating a game object. This is a somewhat arbitrary recommendation, and may not be appropriate for all implementations (or all game situations). Rather it's a reasonable starting point in *most* cases.
     *
     * That said, the game itself recommends **against** rolling all possible results at once (see "Peeling the Onion", p. 293, *Starforged*). If your goal is to implement the game 'as-written', consider how you might include some means of "progressive disclosure" of oracle results.
     *
     * May be deprecated in the future in favour of dedicated object template information.
     */
    Initial?: boolean | undefined;
    Suggestions?: ISuggestions | undefined;
    Requires?: IRequirements | undefined;
    /**
     * The minimum number of rolls when using this oracle to create a game object, *if* this oracle is rolled. Assume it's 1 if not specified.
     * @deprecated Previous versions of the Starforged Backer Preview had tables that made use of this key, but none do at present. Given the "peeling the onion" philosophy, this key is of limited utility, and will probably be removed in future versions.
     */
    "Min rolls"?: number | undefined;
    /**
     * The maximum number of rolls when using this oracle to create a game object. Assume it's 1 if not specified.
     */
    "Max rolls"?: number | undefined;
    /**
     * Whether the table's standard use is iterative.  Common examples are Feature, Opportunity, and Peril tables, which are most often used repeatedly to describe different areas of/events in a place, rather than being assigned as a description of the place as a whole.
     *
     * Mutually exclusive with `Max rolls`. If undefined, assume `false`.
     */
    Repeatable?: boolean | undefined;
    /**
     * Whether multiple rolls (as in object generation, or with {@link IMultipleRolls}) .
     */
    "Allow duplicates"?: boolean | undefined;
    /**
     * Hints which attributes are set by this table.
     */
    "Sets"?: IAttributeChoices[] | undefined;
}
//# sourceMappingURL=IOracleUsage.d.ts.map