
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
import { Input } from "@classes/common/Input.js";
import { InputType } from "@json_out/index.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, IInputSelectOption, IInputSelectOptionSetter , IInputSelectOptionSetterMeter, IInputSelectOptionSetterNumber, IInputSelectOptionSetterStat, IInputSelectOptionSetterString, InputSelectOptionType } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IInputSelectOptionSetterYaml, IInputSelectOptionYaml, IInputSelectYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class InputSelect extends Input implements IInputSelect {
  "Input Type": InputType.Select;
  Sets: IInputSelectAttributeDefinition[];
  Options: IInputSelectOption[];
  Adjustable: boolean;
  constructor(json: IInputSelectYaml, parent: IAssetAbility|IAsset) {
    super(json, parent);
    if (json["Input Type"] !== InputType.Select) {
      throw badJsonError(this.constructor, json["Input Type"], "Expected InputType.Select!");
    }
    this.Adjustable = json.Adjustable ?? false;
    this.Sets = json.Sets;

    this.Options = json.Options.map(optionJson => new InputSelectOption(optionJson, this));

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOption implements IInputSelectOption {
  $id: IInputSelectOption["$id"];
  Name: string;
  Set: (IInputSelectOptionSetterStat| IInputSelectOptionSetterMeter | IInputSelectOptionSetterNumber| IInputSelectOptionSetterString)[];
  constructor(json: IInputSelectOptionYaml, parent: IInputSelect) {
    this.$id = `${parent.$id}/Options/${formatIdFragment(json.Name)}`;
    this.Name = json.Name;
    this.Set = json.Set.map(attr => new InputSelectOptionSetter(attr, this)) as this["Set"];
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetter implements IInputSelectOptionSetter {
  $id: string;
  Key: string;
  Type: InputSelectOptionType;
  Value: IInputSelectOptionSetter["Value"];
  constructor(json: IInputSelectOptionSetterYaml, parent: InputSelectOption) {
    this.$id = `${parent.$id}/${formatIdFragment(json.Key)}`;
    this.Type = json.Type;
    this.Key = json.Key;
    this.Value = json.Value;
  }
}