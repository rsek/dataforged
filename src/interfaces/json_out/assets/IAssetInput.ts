import type { ClockSegments } from "@dataforged/constants/ClockSegments.js";
import type { ClockType } from "@dataforged/constants/ClockType.js";
import type { ConditionMeterName } from "@dataforged/constants/ConditionMeterName.js";
import type InputType from "@dataforged/constants/InputType.js";
import type { Stat } from "@dataforged/constants/Stat.js";
import type { IHasId, IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { AssetConditionMeterId } from "@dataforged/interfaces/json_out/index.js";

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
