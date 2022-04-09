
import type { ClockSegments } from "@json_out/common/ClockSegments.js";
import type { AssetConditionMeterId, ClockType, ConditionMeterName, IHasId , IHasName, InputType, Stat } from "@json_out/index.js";

/**
 * @internal
 */
export interface IInputBase extends IHasId, IHasName {
  "Input Type": InputType;
  Adjustable?: boolean;
}

export type IAssetInput = INumberInput | ISelectInput | ITextInput | IClockInput;



export interface INumberInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Number;
  Min: number;
  Max?: number | undefined;
  Step?: number | undefined;
  "Starting Value": number;
}

export interface IClockInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Clock;
  "Clock Type": ClockType;
  Segments: ClockSegments
  Filled: number;
}



export interface ITextInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Text;
}



export interface ISelectInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Select;
  Options: ISelectInputOption[];
}



export type ISelectInputOption = ISelectInputStatOption | ISelectInputMeterOption | ISelectInputCustomOption;
/**
 * @internal
 */
export interface ISelectInputOptionBase extends IHasId, IHasName { }

export interface ISelectInputStatOption extends ISelectInputOptionBase {
  Stat: Stat;
}

export interface ISelectInputMeterOption extends ISelectInputOptionBase {
  "Condition Meter": ConditionMeterName | AssetConditionMeterId;
}

export interface ISelectInputCustomOption extends ISelectInputOptionBase {
  Value: string;
}
