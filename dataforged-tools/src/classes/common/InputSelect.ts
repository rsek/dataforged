
import { Input } from "@classes/common/Input.js";
import type { IInputSelectOption, IInputSelectOptionSetter, InputSelectOptionSetterId } from "@json_out/assets/IInputSelectOption.js";
import { InputType } from "@json_out/common/InputType.js";
import type { IAsset, IAssetAbility, IInputSelect, IInputSelectAttributeDefinition, InputSelectOptionType } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { IInputSelectOptionYaml, IInputSelectYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class InputSelect<K extends string, V extends InputSelectOptionType> extends Input<InputType.Select> implements IInputSelect<K, V> {
  Sets: IInputSelectAttributeDefinition<K, V>[];
  Options: IInputSelectOption<K, V>[];
  Adjustable: boolean;
  constructor(json: IInputSelectYaml<K, V>, parent: IAssetAbility|IAsset) {
    super(json, parent);
    if (json["Input Type"] !== InputType.Select) {
      throw badJsonError(this.constructor, json["Input Type"], "Expected InputType.Select!");
    }
    this.Adjustable = json.Adjustable ?? false;
    this.Sets = json.Sets;

    this.Options = json.Options.map(optionJson => new InputSelectOption<K, V>(optionJson, this));

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOption<K extends string, V extends InputSelectOptionType> implements IInputSelectOption<K, V> {
  $id: IInputSelectOption<K, V>["$id"];
  Name: string;
  Set: InputSelectOptionSetter<K, V>[];
  constructor(json: IInputSelectOptionYaml<K, V>, parent: IInputSelect<K, V>) {
    this.$id = `${parent.$id}/Options/${json.Name.replace(" ", "_")}`;
    this.Name = json.Name;
    this.Set = json.Set.map(attr => new InputSelectOptionSetter(attr, this));
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetter<K extends string, V extends InputSelectOptionType> implements IInputSelectOptionSetter<K, V> {
  $id: InputSelectOptionSetterId;
  Key: K;
  Value: IInputSelectOptionSetter<K, V>["Value"];
  constructor(json: IInputSelectOptionSetter<K, V>, parent: InputSelectOption<K, V>) {
    this.$id = `${parent.$id}/${json.Key.replace(" ", "_")}`;
    this.Key = json.Key;
    this.Value = json.Value;
  }
}
