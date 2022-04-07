import type { ClockSegments, ClockType } from "@dataforged/classes/common/Input.js";
import type InputType from "@dataforged/classes/common/InputType.js";
import type ConditionMeterName from "@dataforged/constants/ConditionMeterName.js";
import type Stat from "@dataforged/constants/Stat.js";
import type { IHasId, IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { AssetConditionMeterId } from "@dataforged/strings/id/AssetConditionMeterId.js";
import type PartialBy from "@dataforged/utils/types/PartialBy.js";
import type { StubBy } from "@dataforged/utils/types/Stub.js";

export interface IInputBase extends IHasId, IHasName {
  "Input Type": InputType;
  Adjustable?: boolean;
}

export type IAssetInput = INumberInput | ISelectInput | ITextInput | IClockInput;

export type IAssetInputYaml = StubBy<IAssetInput, "$id">;

export interface INumberInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Number;
  Min: number;
  Max?: number | undefined;
  Step?: number | undefined;
  "Starting Value": number;
}

export interface INumberInputYaml extends PartialBy<INumberInput, "$id"> {}

export interface IClockInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Clock;
  "Clock Type": ClockType;
  Segments: ClockSegments
  Filled: number;
}


export interface IClockInputYaml extends PartialBy<IClockInput, "$id"> {}

export interface ITextInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Text;
}


export interface ITextInputYaml extends PartialBy<ITextInput, "$id"> {}



export interface ISelectInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Select;
  Options: ISelectInputOption[];
}


export interface ISelectInputYaml extends PartialBy<ISelectInput, "$id"> {}

export type ISelectInputOption = ISelectInputStatOption | ISelectInputMeterOption | ISelectInputCustomOption;

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
