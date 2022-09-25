
import type { Input, InputSelectOption, InputType } from "@schema";
/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @example
 * ```json
 * {
 *   "Label": "Material",
 *   "Input Type": "Select",
 *   "Attributes": [
 *     { "Key": "stat", "Type": "Stat" },
 *     { "Key": "condition_meter", "Type": "Condition Meter" }
 *    ],
 *    "Options": [
 *      {
 *       "Label": "Thunderwood",
 *       "Sets": [
 *         { "Key": "stat", "Value": "edge" },
 *         { "Key": "condition_meter", "Value": "health" }
 *       ]
 *     }
 *   ]
 * }
 * ```
 * @public
 */
export interface InputSelect extends Input {
  "Input Type": InputType.Select;
  /**
   * Hints which attribute(s) set by this dropdown's options.
   */
  Sets: InputSelectAttributeDefinition[];
  Options: InputSelectOption[];
}

/**
 * Provides hints for the keys and typing of an {@link InputSelect}'s child {@link InputSelectOption}s.
 * @typeParam V - The type(s) of the value(s) set by this item's options.
 * @public
 */
export interface InputSelectAttributeDefinition {
  /**
   * @pattern ^[a-z_]+$
   */
  Key: string;
  Type: InputSelectOptionType;
}

/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export enum InputSelectOptionType {
  /**
   * A reference to one of the player character's stats: edge, heart, iron, shadow, or wits.
   * @see {@link Stat}
   */
  Stat = "Stat",
  /**
   * A reference to one of the player character's condition meters (Starforged) or status tracks (Ironsworn): health, spirit, or supply.
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


