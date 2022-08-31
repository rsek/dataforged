import type { IHasId , IHasLabel, IInputSelectAttributeDefinition, InputSelectOptionType, PlayerConditionMeter, Stat } from "@json_out/index.js";

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export interface IInputSelectOption extends IHasId,  IHasLabel {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+$
   */
  $id: string;
  /**
   * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
   */
  Set: (IInputSelectOptionSetterStat| IInputSelectOptionSetterMeter| IInputSelectOptionSetterNumber| IInputSelectOptionSetterString)[];
}

/**
 * @public
 */
export interface IInputSelectOptionSetter extends IHasId {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  Key: IInputSelectAttributeDefinition["Key"];
  Type: InputSelectOptionType;
  Value: Stat | PlayerConditionMeter | number | string;
}

/**
 * A stat set by an {@link IInputSelectOption}.
 * @public
 */
export interface IInputSelectOptionSetterStat extends IInputSelectOptionSetter {
  Type: InputSelectOptionType.Stat;
  Value: Stat
}
/**
 * A condition meter set by an {@link IInputSelectOption}.
 * @public
 */
export interface IInputSelectOptionSetterMeter extends IInputSelectOptionSetter {
  Type: InputSelectOptionType.ConditionMeter;
  Value: PlayerConditionMeter
}
/**
 * An integer value set by an {@link IInputSelectOption}.
 * @public
 */
export interface IInputSelectOptionSetterNumber extends IInputSelectOptionSetter {
  Type: InputSelectOptionType.Number;
  Value: number
}
/**
 * An arbitrary string value set by an {@link IInputSelectOption}.
 * @public
 */
export interface IInputSelectOptionSetterString extends IInputSelectOptionSetter {
  Type: InputSelectOptionType.String;
  Value: string
}
