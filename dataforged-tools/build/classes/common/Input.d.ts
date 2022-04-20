import type { Asset } from "../assets/Asset.js";
import type { AssetAbility } from "../assets/AssetAbility.js";
import type { IAsset, IAssetAbility, IInput, IInputClock, IInputNumber, IInputText, InputId } from "../../json_out/assets/index.js";
import type { ClockSegments } from "../../json_out/common/index.js";
import { ClockType } from "../../json_out/common/index.js";
import type { InputType } from "../../json_out/common/InputType.js";
import type { IInputClockYaml, IInputNumberYaml, IInputTextYaml, IInputYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class Input<T extends InputType> implements IInput<T> {
    $id: InputId;
    Name: string;
    abstract Adjustable: boolean;
    "Input Type": T;
    constructor(json: IInputYaml<T>, parent: IAssetAbility | IAsset);
}
/**
 * @internal
 */
export declare class InputNumber extends Input<InputType.Number> implements IInputNumber {
    Min: number;
    Max: number | null;
    readonly Step = 1;
    Value: number;
    Adjustable: boolean;
    constructor(json: IInputNumberYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
/**
 * @internal
 */
export declare class InputClock extends Input<InputType.Clock> implements IInputClock {
    "Clock Type": ClockType;
    Segments: ClockSegments;
    Filled: number;
    Adjustable: boolean;
    constructor(json: IInputClockYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
/**
 * @internal
 */
export declare class InputText extends Input<InputType.Text> implements IInputText {
    Adjustable: boolean;
    constructor(json: IInputTextYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
//# sourceMappingURL=Input.d.ts.map