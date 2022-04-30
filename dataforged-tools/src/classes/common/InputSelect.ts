
import { Input } from "@classes/common/Input.js";
import type { IInputSelectOption, IInputSelectOptionSetter, InputSelectOptionSetterId } from "@json_out/assets/IInputSelectOption.js";
import { InputType } from "@json_out/common/InputType.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, InputSelectOptionType } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { IInputSelectOptionYaml, IInputSelectYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class InputSelect<V extends InputSelectOptionType> extends Input implements IInputSelect<V> {
  "Input Type": InputType.Select;
  Sets: IInputSelectAttributeDefinition<V>[];
  Options: IInputSelectOption<V>[];
  Adjustable: boolean;
  constructor(json: IInputSelectYaml<V>, parent: IAssetAbility|IAsset) {
    super(json, parent);
    if (json["Input Type"] !== InputType.Select) {
      throw badJsonError(this.constructor, json["Input Type"], "Expected InputType.Select!");
    }
    this.Adjustable = json.Adjustable ?? false;
    this.Sets = json.Sets;

    this.Options = json.Options.map(optionJson => new InputSelectOption<V>(optionJson, this));

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOption<V extends InputSelectOptionType> implements IInputSelectOption<V> {
  $id: IInputSelectOption<V>["$id"];
  Name: string;
  Set: InputSelectOptionSetter<V>[];
  constructor(json: IInputSelectOptionYaml<V>, parent: IInputSelect<V>) {
    this.$id = `${parent.$id}/Options/${json.Name.replace(" ", "_")}`;
    this.Name = json.Name;
    this.Set = json.Set.map(attr => new InputSelectOptionSetter(attr, this));
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetter<V extends InputSelectOptionType> implements IInputSelectOptionSetter<V> {
  $id: string;
  Key: string;
  Value: IInputSelectOptionSetter<V>["Value"];
  constructor(json: IInputSelectOptionSetter<V>, parent: InputSelectOption<V>) {
    this.$id = `${parent.$id}/${json.Key.replace(" ", "_")}`;
    this.Key = json.Key;
    this.Value = json.Value;
  }
}
