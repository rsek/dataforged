import type { AssetAbilityBuilder , AssetBuilder } from "@builders";
import { ClockType } from "@schema_json";
import type { Asset, AssetAbility, ClockSegments, Input, InputClock, InputNumber , InputText , InputType } from "@schema_json";
import type { YamlInput, YamlInputClock, YamlInputNumber, YamlInputText } from "@schema_yaml";
import { formatId } from "@utils";

/**
 * @internal
 */
export abstract class InputBuilder implements Input {
  $id: string;
  Label: string;
  abstract Adjustable: boolean;
  "Input Type": InputType;
  constructor(json: YamlInput, parent: AssetAbility|Asset) {
    this["Input Type"] = json["Input Type"];
    this.$id = formatId(json._idFragment??json.Label,parent.$id, "Inputs");
    this.Label = json.Label;
    this["Input Type"] = json["Input Type"];
  }
}

/**
 * @internal
 */
export class InputNumberBuilder extends InputBuilder implements InputNumber {
  "Input Type": InputType.Number;
  Min: number;
  Max: number | null;
  readonly Step = 1;
  Value: number;
  Adjustable: boolean;
  constructor(json: YamlInputNumber & {"Input Type": InputType.Number}, parent: AssetAbility|Asset) {
    super(json, parent);
    this.Min = json.Min ?? 0;
    this.Max = json.Max ?? null;
    this.Value = json.Value ?? 0;
    this.Adjustable = json.Adjustable ?? true;
  }
}

/**
 * @internal
 */
export class InputClockBuilder extends InputBuilder implements InputClock {
  "Clock Type": ClockType = ClockType.Tension;
  "Input Type": InputType.Clock;
  Segments: ClockSegments;
  Filled: number;
  Adjustable: boolean;
  constructor(json: YamlInputClock, parent: AssetAbility|Asset) {
    super(json, parent);
    this.Segments = json.Segments;
    this.Filled = json.Filled ?? 0;
    // TODO: validate number range - maybe with decorators?
    this.Adjustable = json.Adjustable ?? true;
  }
}

/**
 * @internal
 */
export class InputTextBuilder extends InputBuilder implements InputText {
  "Input Type": InputType.Text;
  Adjustable: boolean;
  constructor(json: YamlInputText, parent: AssetAbility|Asset) {
    super(json, parent);
    this.Adjustable = json.Adjustable ?? false;
  }
}


