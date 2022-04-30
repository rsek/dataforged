import { Input } from "./Input.js";
import type { IInputSelectOption, IInputSelectOptionSetter } from "../../json_out/assets/IInputSelectOption.js";
import { InputType } from "../../json_out/common/InputType.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, InputSelectOptionType } from "../../json_out/index.js";
import type { IInputSelectOptionYaml, IInputSelectYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class InputSelect<V extends InputSelectOptionType> extends Input implements IInputSelect<V> {
    "Input Type": InputType.Select;
    Sets: IInputSelectAttributeDefinition<V>[];
    Options: IInputSelectOption<V>[];
    Adjustable: boolean;
    constructor(json: IInputSelectYaml<V>, parent: IAssetAbility | IAsset);
}
/**
 * @internal
 */
export declare class InputSelectOption<V extends InputSelectOptionType> implements IInputSelectOption<V> {
    $id: IInputSelectOption<V>["$id"];
    Name: string;
    Set: InputSelectOptionSetter<V>[];
    constructor(json: IInputSelectOptionYaml<V>, parent: IInputSelect<V>);
}
/**
 * @internal
 */
export declare class InputSelectOptionSetter<V extends InputSelectOptionType> implements IInputSelectOptionSetter<V> {
    $id: string;
    Key: string;
    Value: IInputSelectOptionSetter<V>["Value"];
    constructor(json: IInputSelectOptionSetter<V>, parent: InputSelectOption<V>);
}
//# sourceMappingURL=InputSelect.d.ts.map