import type { ConditionMeterName, IHasId, IHasName, IInputBase, InputType, Stat } from "@json_out/index.js";

/**
 * An input where the user selects from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @see {@link InputType.Select}
 */

export interface ISelectInput<T extends SelectInputOptionType> extends IInputBase {
  Name: string;
  "Input Type": InputType.Select;
  /**
   * Hint defining which attribute(s) are set with this dropdown's options.
   */
  // TODO: these should get built into IDs + propagated to the Options
  Attributes: ISelectAttributeDefinition<T>[];
  Options: ISelectInputOption<T>[];
}

export enum SelectInputOptionType {
  Stat = "Stat",
  ConditionMeter = "Condition Meter",
  String = "String",
  Number = "Number"
}

export interface ISelectAttributeDefinition<T extends SelectInputOptionType> {
  Key: string;
  Type: T;
}

export interface ISelectInputOptionSetter<T extends SelectInputOptionType> {
  Key: string;
  Value: T extends SelectInputOptionType.Stat ? Stat : T extends SelectInputOptionType.ConditionMeter ? ConditionMeterName : string;
}
/**
 */
export interface ISelectInputOption<T extends SelectInputOptionType> extends IHasId<string>, IHasName {
  Sets: ISelectInputOptionSetter<T>[];
}
