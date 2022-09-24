
import { InputBuilder } from "@builders";
import { InputType } from "@schema_json";
import type { Asset, AssetAbility, InputSelect, InputSelectAttributeDefinition, InputSelectOption, InputSelectOptionSetter , InputSelectOptionSetterMeter, InputSelectOptionSetterNumber, InputSelectOptionSetterStat, InputSelectOptionSetterString, InputSelectOptionType } from "@schema_json";
import { formatId } from "@utils";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { YamlInputSelect, YamlInputSelectOption, YamlInputSelectOptionSetter } from "@schema_yaml";

/**
 * @internal
 */
export class InputSelectBuilder extends InputBuilder implements InputSelect {
  "Input Type": InputType.Select;
  Sets: InputSelectAttributeDefinition[];
  Options: InputSelectOption[];
  Adjustable: boolean;
  constructor(json: YamlInputSelect, parent: AssetAbility|Asset) {
    super(json, parent);
    if (json["Input Type"] !== InputType.Select) {
      throw badJsonError(this.constructor, json["Input Type"], "Expected InputType.Select!");
    }
    this.Adjustable = json.Adjustable ?? false;
    this.Sets = json.Sets;

    this.Options = json.Options.map(optionJson => new InputSelectOptionBuilder(optionJson, this));

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOptionBuilder implements InputSelectOption {
  $id: InputSelectOption["$id"];
  Label: string;
  Set: (InputSelectOptionSetterStat| InputSelectOptionSetterMeter | InputSelectOptionSetterNumber| InputSelectOptionSetterString)[];
  constructor(json: YamlInputSelectOption, parent: InputSelect) {
    const fragment = json._idFragment??json.Label;
    this.$id = formatId(fragment,parent.$id, "Options");
    this.Label = json.Label;
    this.Set = json.Set.map(attr => new InputSelectOptionSetterBuilder(attr, this)) as this["Set"];
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetterBuilder implements InputSelectOptionSetter {
  $id: string;
  Key: string;
  Type: InputSelectOptionType;
  Value: InputSelectOptionSetter["Value"];
  constructor(json: YamlInputSelectOptionSetter, parent: InputSelectOptionBuilder) {
    const fragment = json._idFragment??json.Key;
    this.$id = formatId(fragment, parent.$id);
    this.Type = json.Type;
    this.Key = json.Key;
    this.Value = json.Value;
  }
}