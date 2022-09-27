import type { HasId, HasLabel, InputSelect, InputSelectOptionType, PlayerConditionMeter, Stat } from "@schema";

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
