import { Input } from "./Input.js";
import type { IInputSelectOption, IInputSelectOptionSetter, InputSelectOptionSetterId } from "../../json_out/assets/IInputSelectOption.js";
import { InputType } from "../../json_out/common/InputType.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, InputSelectOptionType } from "../../json_out/index.js";
import type { IInputSelectOptionYaml, IInputSelectYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class InputSelect<K extends string, V extends InputSelectOptionType> extends Input<InputType.Select> implements IInputSelect<K, V> {
    Sets: IInputSelectAttributeDefinition<K, V>[];
    Options: IInputSelectOption<K, V>[];
    Adjustable: boolean;
    constructor(json: IInputSelectYaml<K, V>, parent: IAssetAbility | IAsset);
}
/**
 * @internal
 */
export declare class InputSelectOption<K extends string, V extends InputSelectOptionType> implements IInputSelectOption<K, V> {
    $id: IInputSelectOption<K, V>["$id"];
    Name: string;
    Set: InputSelectOptionSetter<K, V>[];
    constructor(json: IInputSelectOptionYaml<K, V>, parent: IInputSelect<K, V>);
}
/**
 * @internal
 */
export declare class InputSelectOptionSetter<K extends string, V extends InputSelectOptionType> implements IInputSelectOptionSetter<K, V> {
    $id: InputSelectOptionSetterId;
    Key: K;
    Value: IInputSelectOptionSetter<K, V>["Value"];
    constructor(json: IInputSelectOptionSetter<K, V>, parent: InputSelectOption<K, V>);
}
//# sourceMappingURL=InputSelect.d.ts.map