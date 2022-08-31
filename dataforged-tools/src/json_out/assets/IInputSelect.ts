
import type { IInput , IInputSelectOption, InputType } from "@json_out/index.js";
/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @example
 * ```typescript
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


