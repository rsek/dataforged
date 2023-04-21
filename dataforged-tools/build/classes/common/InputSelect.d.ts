import { Input } from "./Input.js";
import { InputType } from "../../json_out/index.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, IInputSelectOption, IInputSelectOptionSetter, IInputSelectOptionSetterMeter, IInputSelectOptionSetterNumber, IInputSelectOptionSetterStat, IInputSelectOptionSetterString, InputSelectOptionType } from "../../json_out/index.js";
import type { IInputSelectOptionSetterYaml, IInputSelectOptionYaml, IInputSelectYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class InputSelect extends Input implements IInputSelect {
    "Input Type": InputType.Select;
    Sets: IInputSelectAttributeDefinition[];
    Options: IInputSelectOption[];
    Adjustable: boolean;
    constructor(json: IInputSelectYaml, parent: IAssetAbility | IAsset);
}
/**
 * @internal
 */
export declare class InputSelectOption implements IInputSelectOption {
    $id: IInputSelectOption["$id"];
    Name: string;
    Set: (IInputSelectOptionSetterStat | IInputSelectOptionSetterMeter | IInputSelectOptionSetterNumber | IInputSelectOptionSetterString)[];
    constructor(json: IInputSelectOptionYaml, parent: IInputSelect);
}
/**
 * @internal
 */
export declare class InputSelectOptionSetter implements IInputSelectOptionSetter {
    $id: string;
    Key: string;
    Type: InputSelectOptionType;
    Value: IInputSelectOptionSetter["Value"];
    constructor(json: IInputSelectOptionSetterYaml, parent: InputSelectOption);
}
//# sourceMappingURL=InputSelect.d.ts.map