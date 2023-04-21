
import type { Input, InputType, MixinId, MixinLabel, PcConditionMeterType, Stat } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @public
 */
export interface InputSelect extends Input {
  input_type: InputType.Select
  /**
   * Hints which attribute(s) are set by this dropdown's options.
   */
  sets_attributes: {
    [key: SnakeCaseString]: InputSelectAttributeDefinition
  }
  options: {
    [key: SnakeCaseString]: InputSelectOption
  }
}

/**
 * Provides hints for the keys and typing of an {@link InputSelect}'s child {@link InputSelectOption}s.
 * @public
 */
export interface InputSelectAttributeDefinition {
  attribute_type: InputSelectOptionType
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
  Stat = 'stat',
  /**
   * A reference to one of the player character's condition meters (*Starforged*) or status tracks (*Ironsworn*): health, spirit, or supply.
   * @see {@link PcConditionMeterType}
   */
  ConditionMeter = 'condition_meter',
  /**
   * An arbitrary pre-set string value.
   */
  String = 'string',
  /**
   * A arbitrary pre-set number value.
   */
  Number = 'number'
}

/**
 * Represents an option in an {@link InputSelect}.
 * @public
 */
export interface InputSelectOption extends MixinId, MixinLabel {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+/[a-z_]+/inputs/[a-z_]+/options/[a-z_]+$
   */
  $id: string
  /**
   * A keyed object describing what attribute keys should be set to when this option is active. *All* items in the object should be set in this manner.
   */
  set_attributes: {
    [key: keyof InputSelect['sets_attributes']]: InputSelectOptionSetter
  }
}

/**
 * @public
 */
export interface InputSelectOptionSetter extends MixinId {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+/[a-z_]+/inputs/[a-z_]+/options/[a-z_]+/[a-z_]+$
   */
  $id: string
  attribute_type: InputSelectOptionType
  value: Stat | PcConditionMeterType | number | string
}

/**
 * A stat set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterStat extends InputSelectOptionSetter {
  attribute_type: InputSelectOptionType.Stat
  value: Stat
}
/**
 * A condition meter set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterMeter extends InputSelectOptionSetter {
  attribute_type: InputSelectOptionType.ConditionMeter
  value: PcConditionMeterType
}
/**
 * An integer value set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterNumber extends InputSelectOptionSetter {
  attribute_type: InputSelectOptionType.Number
  value: number
}
/**
 * An arbitrary string value set by an {@link InputSelectOption}.
 * @public
 */
export interface InputSelectOptionSetterString extends InputSelectOptionSetter {
  attribute_type: InputSelectOptionType.String
  value: string
}
