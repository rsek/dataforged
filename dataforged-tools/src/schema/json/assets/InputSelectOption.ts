import type { HasId, HasLabel, InputSelectAttributeDefinition, InputSelectOptionType, PlayerConditionMeter, Stat } from "@schema";

/**
 * Represents an option in an {@link InputSelect}.
 * @public
 */
export interface InputSelectOption extends HasId, HasLabel {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+$
   */
  $id: string;
  /**
   * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
   */
  Set: (InputSelectOptionSetterStat| InputSelectOptionSetterMeter| InputSelectOptionSetterNumber| InputSelectOptionSetterString)[];
}

/**
 * @public
 */
export interface InputSelectOptionSetter extends HasId {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  Key: InputSelectAttributeDefinition["Key"];
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
