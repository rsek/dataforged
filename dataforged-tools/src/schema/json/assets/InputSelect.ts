
import type { Input, InputSelectOption, InputType } from "@schema";

// TODO: fix the example here
/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @public
 */
export interface InputSelect extends Input {
  "Input type": InputType.Select;
  /**
   * Hints which attribute(s) are set by this dropdown's options.
   * @patternProperties ^[a-z_]+$
   */
  "Sets attributes": {
    [key: string]: InputSelectAttributeDefinition
  };
  Options: {
    [key: string]: InputSelectOption
  };
}

/**
 * Provides hints for the keys and typing of an {@link InputSelect}'s child {@link InputSelectOption}s.
 * @public
 */
export interface InputSelectAttributeDefinition {
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
  Stat = "stat",
  /**
   * A reference to one of the player character's condition meters (Starforged) or status tracks (Ironsworn): health, spirit, or supply.
   * @see {@link PlayerConditionMeter}
   */
  ConditionMeter = "condition meter",
  /**
   * An arbitrary pre-set string value.
   */
  String = "string",
  /**
   * A arbitrary pre-set number value.
   */
  Number = "number"
}


