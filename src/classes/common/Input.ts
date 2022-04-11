import { InputType } from "@json_out/common/InputType.js";
import type { AssetConditionMeterId, ClockSegments, ConditionMeterName, IClockInput, IHasId, INumberInput, ISelectInput, ISelectInputCustomOption, ISelectInputMeterOption, ISelectInputStatOption, ITextInput, Stat } from "@json_out/index.js";
import { ClockType , SelectInputOptionType } from "@json_out/index.js";

export type Input = NumberInput | SelectInput | TextInput;

/**
 * @internal
 */
export class NumberInput implements INumberInput, IHasId<string> {
  $id: string;
  Name!: string;
  "Input Type": InputType.Number;
  Min: number = 0;
  Max?: number | undefined;
  Step: number = 1;
  "Starting Value" = 0;
  Adjustable = true;
  constructor(json: Omit<INumberInput, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

/**
 * @internal
 */
export class ClockInput implements IClockInput, IHasId<string> {
  Name!: string;
  readonly "Input Type" = InputType.Clock;
  "Clock Type": ClockType = ClockType.Tension;
  Segments!: ClockSegments;
  Filled: number = 0;
  readonly Adjustable = true;
  $id: string;
  constructor(json: Omit<IClockInput,"$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

/**
 * @internal
 */
export class TextInput implements ITextInput, IHasId<string> {
  $id: string;
  "Input Type": InputType.Text;
  Name!: string;
  Adjustable = false;
  constructor(json: Omit<ITextInput,"$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


/**
 * @internal
 */
type AnyInputOption = AssetSelectInputStatOption | SelectInputMeterOption | SelectInputCustomOption;

/**
 * @internal
 */
export class SelectInput implements ISelectInput {
  $id: string;
  Name: string;
  "Input Type": InputType.Select;
  "Option Type": SelectInputOptionType;
  Options: AnyInputOption[];
  Adjustable = false;
  constructor(json: Omit<ISelectInput, "$id">, id: string) {
    console.log(json);
    this.$id = id;
    this.Name = json.Name;
    this["Input Type"] = json["Input Type"];
    this["Option Type"] = json["Option Type"];
    this.Options = json.Options.map(optionJson => {
      switch (json["Option Type"]) {
        case SelectInputOptionType.ConditionMeter:
          return new SelectInputMeterOption(optionJson as ISelectInputMeterOption, `${this.$id}/Options/${optionJson.Name}`);
        case SelectInputOptionType.Stat:
          return new AssetSelectInputStatOption(optionJson as ISelectInputStatOption, `${this.$id}/Options/${optionJson.Name}`);
        case SelectInputOptionType.Custom:
          return new SelectInputCustomOption(optionJson as ISelectInputCustomOption, `${this.$id}/Options/${optionJson.Name}`);
        default:
          throw new Error("Unable to construct select input options - check the data!");
      }
    });
    this.Adjustable = json.Adjustable ?? false;
  }
}

/**
 * @internal
 */
export class AssetSelectInputStatOption implements ISelectInputStatOption, IHasId<string> {
  $id: string;
  Name!: string;
  Stat!: Stat;
  "Option Type": SelectInputOptionType.Stat;
  constructor(json: Omit<ISelectInputStatOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


/**
 * @internal
 */
export class SelectInputMeterOption implements ISelectInputMeterOption, IHasId<string> {
  $id: string;
  Name!: string;
  "Option Type": SelectInputOptionType.ConditionMeter;
  "Condition Meter"!: ConditionMeterName | AssetConditionMeterId;
  constructor(json: Omit<ISelectInputMeterOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


/**
 * @internal
 */
export class SelectInputCustomOption implements ISelectInputCustomOption, IHasId<string> {
  $id: string;
  Name!: string;
  Value!: string;
  "Option Type": SelectInputOptionType.Custom;
  constructor(json: Omit<ISelectInputCustomOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}