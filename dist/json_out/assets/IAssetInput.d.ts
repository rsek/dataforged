import type { ClockSegments } from "../../../dist/json_out/common/ClockSegments.js";
import type { AssetConditionMeterId, ClockType, ConditionMeterName, IHasId, IHasName, InputType, Stat } from "@dataforged/json_out/index.js";
export interface IInputBase extends IHasId, IHasName {
    "Input Type": InputType;
    Adjustable?: boolean;
}
export declare type IAssetInput = INumberInput | ISelectInput | ITextInput | IClockInput;
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
    Segments: ClockSegments;
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
export declare type ISelectInputOption = ISelectInputStatOption | ISelectInputMeterOption | ISelectInputCustomOption;
export interface ISelectInputOptionBase extends IHasId, IHasName {
}
export interface ISelectInputStatOption extends ISelectInputOptionBase {
    Stat: Stat;
}
export interface ISelectInputMeterOption extends ISelectInputOptionBase {
    "Condition Meter": ConditionMeterName | AssetConditionMeterId;
}
export interface ISelectInputCustomOption extends ISelectInputOptionBase {
    Value: string;
}
//# sourceMappingURL=IAssetInput.d.ts.map