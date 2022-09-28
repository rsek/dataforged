import { ClockType } from "@schema";
import type { Asset, AssetAbility, ClockSegments, Input , InputClock, InputNumber, InputText, InputType, YamlInput, YamlInputClock, YamlInputNumber, YamlInputText } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export abstract class InputBuilder implements Input {
  $id: string;
  Label: string;
  abstract Permanent: boolean;
  "Type": InputType;
  constructor(yaml: YamlInput, parent: AssetAbility|Asset) {
    this["Type"] = yaml["Type"];
    this.$id = formatId(yaml._idFragment??yaml.Label,parent.$id, "Inputs");
    this.Label = yaml.Label;
    this["Type"] = yaml["Type"];
  }
}

/**
 * @internal
 */
export class InputNumberBuilder extends InputBuilder implements InputNumber {
  "Type": InputType.Number;
  Min: number;
  Max: number | null;
  readonly Step = 1;
  Value: number;
  Permanent: boolean;
  constructor(yaml: YamlInputNumber & {"Input type": InputType.Number}, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Min = yaml.Min ?? 0;
    this.Max = yaml.Max ?? null;
    this.Value = yaml.Value ?? 0;
    this.Permanent = yaml.Permanent ?? true;
  }
}

/**
 * @internal
 */
export class InputClockBuilder extends InputBuilder implements InputClock {
  "Clock type": ClockType = ClockType.Tension;
  "Type": InputType.Clock;
  Segments: ClockSegments;
  Filled: number;
  Permanent: boolean;
  constructor(yaml: YamlInputClock, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Segments = yaml.Segments;
    this.Filled = yaml.Filled ?? 0;
    // TODO: validate number range - maybe with decorators?
    this.Permanent = yaml.Permanent ?? true;
  }
}

/**
 * @internal
 */
export class InputTextBuilder extends InputBuilder implements InputText {
  "Type": InputType.Text;
  Permanent: boolean;
  constructor(yaml: YamlInputText, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Permanent = yaml.Permanent ?? false;
  }
}


