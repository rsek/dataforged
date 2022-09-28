
import type { HasId, HasLabel , Input, InputType, PlayerConditionMeter, Stat } from "@schema";

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @public
 */
export interface InputSelect extends Input {
  "Type": InputType.Select;
  /**
   * Hints which attribute(s) are set by this dropdown's options.
   * @patternProperties ^[A-z][a-z ]+$
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
   * A reference to one of the player character's condition meters (*Starforged*) or status tracks (*Ironsworn*): health, spirit, or supply.
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

/**
 * Represents an option in an {@link InputSelect}.
 * @public
 */
export interface InputSelectOption extends HasId, HasLabel {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+$
   */
  $id: string;
  /**
   * A keyed object describing what attribute keys should be set to when this option is active. *All* items in the object should be set in this manner.
   */
  "Set attributes": {
    [key: keyof InputSelect["Sets attributes"]]: InputSelectOptionSetter
  }
}

/**
 * @public
 */
export interface InputSelectOptionSetter extends HasId {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+/[a-z_-]+$
   */
  $id: string;
  Type: InputSelectOptionType;
  Value: Stat | PlayerConditionMeter | number | string;
}

/**
 * A stat set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterStat extends InputSelectOptionSetter {
  Type: InputSelectOptionType.Stat;
  Value: Stat
}
/**
 * A condition meter set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterMeter extends InputSelectOptionSetter {
  Type: InputSelectOptionType.ConditionMeter;
  Value: PlayerConditionMeter
}
/**
 * An integer value set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterNumber extends InputSelectOptionSetter {
  Type: InputSelectOptionType.Number;
  Value: number
}
/**
 * An arbitrary string value set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterString extends InputSelectOptionSetter {
  Type: InputSelectOptionType.String;
  Value: string
}
