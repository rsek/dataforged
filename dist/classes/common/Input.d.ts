import { InputType } from "../../json_out/common/InputType.js";
import type { AssetConditionMeterId, ClockSegments, ConditionMeterName, IClockInput, IHasId, INumberInput, ISelectInput, ISelectInputCustomOption, ISelectInputMeterOption, ISelectInputStatOption, ITextInput, Stat } from "../../json_out/index.js";
import { ClockType } from "../../json_out/index.js";
export declare type Input = NumberInput | SelectInput | TextInput;
export declare class NumberInput implements INumberInput, IHasId {
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
export declare class ClockInput implements IClockInput, IHasId {
    Name: string;
    readonly "Input Type" = InputType.Clock;
    "Clock Type": ClockType;
    Segments: ClockSegments;
    Filled: number;
    readonly Adjustable = true;
    $id: string;
    constructor(json: Omit<IClockInput, "$id">, id: string);
}
export declare class TextInput implements ITextInput, IHasId {
    $id: string;
    "Input Type": InputType.Text;
    Name: string;
    Adjustable: boolean;
    constructor(json: Omit<ITextInput, "$id">, id: string);
}
declare type AnyInputOption = AssetSelectInputStatOption | SelectInputMeterOption | SelectInputCustomOption;
export declare class SelectInput implements ISelectInput, IHasId {
    $id: string;
    Name: string;
    "Input Type": InputType.Select;
    Options: AnyInputOption[];
    Adjustable: boolean;
    constructor(json: Omit<ISelectInput, "$id">, id: string);
}
export declare class AssetSelectInputStatOption implements ISelectInputStatOption, IHasId {
    $id: string;
    Name: string;
    Stat: Stat;
    constructor(json: Omit<ISelectInputStatOption, "$id">, id: string);
}
export declare class SelectInputMeterOption implements ISelectInputMeterOption, IHasId {
    $id: string;
    Name: string;
    "Condition Meter": ConditionMeterName | AssetConditionMeterId;
    constructor(json: Omit<ISelectInputMeterOption, "$id">, id: string);
}
declare class SelectInputCustomOption implements ISelectInputCustomOption, IHasId {
    $id: string;
    Name: string;
    Value: string;
    constructor(json: Omit<ISelectInputCustomOption, "$id">, id: string);
}
export {};
//# sourceMappingURL=Input.d.ts.map