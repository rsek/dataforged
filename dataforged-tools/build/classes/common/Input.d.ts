import type { Asset } from "../assets/Asset.js";
import type { AssetAbility } from "../assets/AssetAbility.js";
import { ClockType } from "../../json_out/index.js";
import type { ClockSegments, IAsset, IAssetAbility, IInput, IInputClock, IInputNumber, IInputText, InputType } from "../../json_out/index.js";
import type { IInputClockYaml, IInputNumberYaml, IInputTextYaml, IInputYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class Input implements IInput {
    $id: string;
    Label: string;
    Name?: string | undefined;
    abstract Adjustable: boolean;
    "Input Type": InputType;
    constructor(json: IInputYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
/**
 * @internal
 */
export declare class InputNumber extends Input implements IInputNumber {
    "Input Type": InputType.Number;
    Min: number;
    Max: number | null;
    readonly Step = 1;
    Value: number;
    Adjustable: boolean;
    constructor(json: IInputNumberYaml & {
        "Input Type": InputType.Number;
    }, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
/**
 * @internal
 */
export declare class InputClock extends Input implements IInputClock {
    "Clock Type": ClockType;
    "Input Type": InputType.Clock;
    Segments: ClockSegments;
    Filled: number;
    Adjustable: boolean;
    constructor(json: IInputClockYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
/**
 * @internal
 */
export declare class InputText extends Input implements IInputText {
    "Input Type": InputType.Text;
    Adjustable: boolean;
    constructor(json: IInputTextYaml, parent: IAssetAbility | IAsset | Asset | AssetAbility);
}
//# sourceMappingURL=Input.d.ts.map