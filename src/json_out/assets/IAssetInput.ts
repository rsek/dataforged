
import type { ClockSegments } from "@json_out/common/ClockSegments.js";
import type { AssetConditionMeterId, ClockType, ConditionMeterName, IHasId , IHasName, InputType, Stat } from "@json_out/index.js";

/**
 */
export interface IInputBase extends IHasId<string>, IHasName {
  "Input Type": InputType;
  Adjustable?: boolean;
}

export type IAssetInput = INumberInput | ISelectInput | ITextInput | IClockInput;

/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner.
 * @see {@link InputType.Number}
 */
export interface INumberInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Number;
  Min: number;
  Max?: number | undefined;
  Step?: number | undefined;
  "Starting Value": number;
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @seePage 239
 * @see {@link InputType.Clock}
 */
export interface IClockInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Clock;
  "Clock Type": ClockType;
  Segments: ClockSegments
  Filled: number;
}
/**
 * A text input.
 * Suggested rendering: a single-line text input.
 * @see {@link InputType.Text}
 */
export interface ITextInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Text;
}

/**
 * An input where the user selects from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @see {@link InputType.Select}
 */
export interface ISelectInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Select;
  "Option Type": SelectInputOptionType;
  Options: ISelectInputOption<this["Option Type"]>[];
}

/**
 */
export interface ISelectInputOption<T extends SelectInputOptionType> extends IHasId<string>, IHasName {
  "Option Type": T;
}

export enum SelectInputOptionType {
  Stat = "Stat",
  ConditionMeter = "Condition Meter",
  Custom = "Custom"
}

export interface ISelectInputStatOption extends ISelectInputOption<SelectInputOptionType.Stat> {
  Stat: Stat;
}

export interface ISelectInputMeterOption extends ISelectInputOption<SelectInputOptionType.ConditionMeter> {
  "Condition Meter": ConditionMeterName | AssetConditionMeterId;
}

export interface ISelectInputCustomOption extends ISelectInputOption<SelectInputOptionType.Custom> {
  Value: string;
}
