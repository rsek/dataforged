import type { ClockSegments } from "../common/ClockSegments.js";
import type { AssetConditionMeterId, ClockType, ConditionMeterName, IHasId, IHasName, InputType, Stat } from "../index.js";
/**
 * @internal
 */
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
    "Option Type": SelectInputOptionType;
    Options: ISelectInputOption<this["Option Type"]>[];
}
/**
 * @internal
 */
export interface ISelectInputOption<T extends SelectInputOptionType> extends IHasId, IHasName {
    "Option Type": T;
}
export declare enum SelectInputOptionType {
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
//# sourceMappingURL=IAssetInput.d.ts.map