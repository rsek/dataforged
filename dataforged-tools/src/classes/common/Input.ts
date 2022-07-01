//License: MIT
import type { Asset } from "@classes/assets/Asset.js";
import type { AssetAbility } from "@classes/assets/AssetAbility.js";
import { ClockType } from "@json_out/index.js";
import type { ClockSegments, IAsset, IAssetAbility, IInput, IInputClock, IInputNumber , IInputText , InputType } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IInputClockYaml, IInputNumberYaml, IInputTextYaml, IInputYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export abstract class Input implements IInput {
  $id: string;
  Name: string;
  abstract Adjustable: boolean;
  "Input Type": InputType;
  constructor(json: IInputYaml, parent: IAssetAbility|IAsset|Asset|AssetAbility) {
    this["Input Type"] = json["Input Type"];
    this.$id = `${parent.$id}/Inputs/${formatIdFragment(json.Name)}`;
    this.Name = json.Name;
    this["Input Type"] = json["Input Type"];
  }
}

/**
 * @internal
 */
export class InputNumber extends Input implements IInputNumber {
  "Input Type": InputType.Number;
  Min: number;
  Max: number | null;
  readonly Step = 1;
  Value: number;
  Adjustable: boolean;
  constructor(json: IInputNumberYaml & {"Input Type": InputType.Number}, parent: IAssetAbility|IAsset|Asset|AssetAbility) {
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
export class InputClock extends Input implements IInputClock {
  "Clock Type": ClockType = ClockType.Tension;
  "Input Type": InputType.Clock;
  Segments: ClockSegments;
  Filled: number;
  Adjustable: boolean;
  constructor(json: IInputClockYaml, parent: IAssetAbility|IAsset|Asset|AssetAbility) {
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
export class InputText extends Input implements IInputText {
  "Input Type": InputType.Text;
  Adjustable: boolean;
  constructor(json: IInputTextYaml, parent: IAssetAbility|IAsset|Asset|AssetAbility) {
    super(json, parent);
    this.Adjustable = json.Adjustable ?? false;
  }
}


