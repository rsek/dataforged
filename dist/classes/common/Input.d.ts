import { InputType } from "../../json_out/common/InputType.js";
import type { AssetConditionMeterId, ClockSegments, ConditionMeterName, IClockInput, IHasId, INumberInput, ISelectInput, ISelectInputCustomOption, ISelectInputMeterOption, ISelectInputStatOption, ITextInput, Stat } from "../../json_out/index.js";
import { ClockType, SelectInputOptionType } from "../../json_out/index.js";
export declare type Input = NumberInput | SelectInput | TextInput;
/**
 * @internal
 */
export declare class NumberInput implements INumberInput, IHasId<string> {
    $id: string;
    Name: string;
    "Input Type": InputType.Number;
    Min: number;
    Max?: number | undefined;
    Step: number;
    "Starting Value": number;
    Adjustable: boolean;
    constructor(json: Omit<INumberInput, "$id">, id: string);
}
/**
 * @internal
 */
export declare class ClockInput implements IClockInput, IHasId<string> {
    Name: string;
    readonly "Input Type" = InputType.Clock;
    "Clock Type": ClockType;
    Segments: ClockSegments;
    Filled: number;
    readonly Adjustable = true;
    $id: string;
    constructor(json: Omit<IClockInput, "$id">, id: string);
}
/**
 * @internal
 */
export declare class TextInput implements ITextInput, IHasId<string> {
    $id: string;
    "Input Type": InputType.Text;
    Name: string;
    Adjustable: boolean;
    constructor(json: Omit<ITextInput, "$id">, id: string);
}
/**
 * @internal
 */
declare type AnyInputOption = AssetSelectInputStatOption | SelectInputMeterOption | SelectInputCustomOption;
/**
 * @internal
 */
export declare class SelectInput implements ISelectInput {
    $id: string;
    Name: string;
    "Input Type": InputType.Select;
    "Option Type": SelectInputOptionType;
    Options: AnyInputOption[];
    Adjustable: boolean;
    constructor(json: Omit<ISelectInput, "$id">, id: string);
}
/**
 * @internal
 */
export declare class AssetSelectInputStatOption implements ISelectInputStatOption, IHasId<string> {
    $id: string;
    Name: string;
    Stat: Stat;
    "Option Type": SelectInputOptionType.Stat;
    constructor(json: Omit<ISelectInputStatOption, "$id">, id: string);
}
/**
 * @internal
 */
export declare class SelectInputMeterOption implements ISelectInputMeterOption, IHasId<string> {
    $id: string;
    Name: string;
    "Option Type": SelectInputOptionType.ConditionMeter;
    "Condition Meter": ConditionMeterName | AssetConditionMeterId;
    constructor(json: Omit<ISelectInputMeterOption, "$id">, id: string);
}
/**
 * @internal
 */
export declare class SelectInputCustomOption implements ISelectInputCustomOption, IHasId<string> {
    $id: string;
    Name: string;
    Value: string;
    "Option Type": SelectInputOptionType.Custom;
    constructor(json: Omit<ISelectInputCustomOption, "$id">, id: string);
}
export {};
//# sourceMappingURL=Input.d.ts.map