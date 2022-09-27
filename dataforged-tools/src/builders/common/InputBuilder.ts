import { ClockType } from "@schema";
import type { Asset, AssetAbility, ClockSegments, Input , InputClock, InputNumber, InputText, InputType, YamlInput, YamlInputClock, YamlInputNumber, YamlInputText } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export abstract class InputBuilder implements Input {
  $id: string;
  Label: string;
  abstract Adjustable: boolean;
  "Input type": InputType;
  constructor(yaml: YamlInput, parent: AssetAbility|Asset) {
    this["Input type"] = yaml["Input type"];
    this.$id = formatId(yaml._idFragment??yaml.Label,parent.$id, "Inputs");
    this.Label = yaml.Label;
    this["Input type"] = yaml["Input type"];
  }
}

/**
 * @internal
 */
export class InputNumberBuilder extends InputBuilder implements InputNumber {
  "Input type": InputType.Number;
  Min: number;
  Max: number | null;
  readonly Step = 1;
  Value: number;
  Adjustable: boolean;
  constructor(yaml: YamlInputNumber & {"Input type": InputType.Number}, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Min = yaml.Min ?? 0;
    this.Max = yaml.Max ?? null;
    this.Value = yaml.Value ?? 0;
    this.Adjustable = yaml.Adjustable ?? true;
  }
}

/**
 * @internal
 */
export class InputClockBuilder extends InputBuilder implements InputClock {
  "Clock type": ClockType = ClockType.Tension;
  "Input type": InputType.Clock;
  Segments: ClockSegments;
  Filled: number;
  Adjustable: boolean;
  constructor(yaml: YamlInputClock, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Segments = yaml.Segments;
    this.Filled = yaml.Filled ?? 0;
    // TODO: validate number range - maybe with decorators?
    this.Adjustable = yaml.Adjustable ?? true;
  }
}

/**
 * @internal
 */
export class InputTextBuilder extends InputBuilder implements InputText {
  "Input type": InputType.Text;
  Adjustable: boolean;
  constructor(yaml: YamlInputText, parent: AssetAbility|Asset) {
    super(yaml, parent);
    this.Adjustable = yaml.Adjustable ?? false;
  }
}


