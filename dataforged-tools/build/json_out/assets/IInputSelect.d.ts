import type { IInput, IInputSelectOption, InputType } from "../index.js";
/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @example
 * ```typescript
 * {
 *   "Label": "Material",
 *   "Input Type": "Select",
 *   "Attributes": [
 *     { "Key": "Stat", "Type": "Stat" },
 *     { "Key": "Condition Meter", "Type": "Condition Meter" }
 *    ],
 *    "Options": [
 *      {
 *       "Label": "Thunderwood",
 *       "Sets": [
 *         { "Key": "Stat", "Value": "Edge" },
 *         { "Key": "Condition Meter", "Value": "Health" }
 *       ]
 *     }
 *   ]
 * }
 * ```
 * @public
 */
export interface IInputSelect extends IInput {
    "Input Type": InputType.Select;
    /**
     * Hints which attribute(s) set by this dropdown's options.
     */
    Sets: IInputSelectAttributeDefinition[];
    Options: IInputSelectOption[];
}
/**
 * Provides hints for the keys and typing of an {@link IInputSelect}'s child {@link IInputSelectOption}s.
 * @typeParam V - The type(s) of the value(s) set by this item's options.
 * @public
 */
export interface IInputSelectAttributeDefinition {
    Key: string;
    Type: InputSelectOptionType;
}
/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export declare enum InputSelectOptionType {
    /**
     * A reference to one of the player character's stats: Edge, Heart, Iron, Shadow, or Wits.
     * @see {@link Stat}
     */
    Stat = "Stat",
    /**
     * A reference to one of the player character's condition meters: Health, Spirit, or Supply.
     * @see {@link PlayerConditionMeter}
     */
    ConditionMeter = "Condition Meter",
    /**
     * An arbitrary pre-set string value.
     */
    String = "String",
    /**
     * A arbitrary pre-set number value.
     */
    Number = "Number"
}
//# sourceMappingURL=IInputSelect.d.ts.map