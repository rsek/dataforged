import type { IClockInput, INumberInput, ISelectInput, ISelectInputCustomOption, ISelectInputMeterOption, ISelectInputStatOption, ITextInput } from "@dataforged/classes/common/IInput.js";
import InputType from "@dataforged/classes/common/InputType.js";
import type ConditionMeterName from "@dataforged/constants/ConditionMeterName.js";
import type Stat from "@dataforged/constants/Stat.js";
import type { IHasId } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { AssetConditionMeterId } from "@dataforged/strings/id/AssetConditionMeterId.js";
import type { StubBy } from "@dataforged/utils/types/Stub.js";
import { is } from "typescript-is";

export type Input = NumberInput | SelectInput | TextInput;

export class NumberInput implements INumberInput, IHasId {
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

export enum ClockType {
  Tension = "Tension",
  Campaign = "Campaign"
}

export enum ClockSegments {
  Four = 4,
  Six = 6,
  Eight = 8,
  Ten = 10
}


export class ClockInput implements IClockInput, IHasId {
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

export class TextInput implements ITextInput, IHasId {
  $id: string;
  "Input Type": InputType.Text;
  Name!: string;
  Adjustable = false;
  constructor(json: Omit<ITextInput,"$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


type AnyInputOption = AssetSelectInputStatOption | SelectInputMeterOption | SelectInputCustomOption;

export class SelectInput implements ISelectInput, IHasId {
  $id: string;
  Name: string;
  "Input Type": InputType.Select;
  Options: AnyInputOption[];
  Adjustable = false;
  constructor(json: Omit<ISelectInput, "$id">, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this["Input Type"] = json["Input Type"];
    this.Options = json.Options.map(optionJson => {
      let option: AnyInputOption;
      if (is<StubBy<ISelectInputStatOption, "$id">>(optionJson)) {
        option = new AssetSelectInputStatOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      } else if (is<StubBy<ISelectInputMeterOption, "$id">>(optionJson)) {
        option = new SelectInputMeterOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      } else if (is<StubBy<ISelectInputCustomOption, "$id">>(optionJson)) {
        option = new SelectInputCustomOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      } else { throw new Error("Unable to construct select input options - check the data!"); }
      return option;
    });
    this.Adjustable = json.Adjustable ?? false;
  }
}

export class AssetSelectInputStatOption implements ISelectInputStatOption, IHasId {
  $id: string;
  Name!: string;
  Stat!: Stat;
  constructor(json: Omit<ISelectInputStatOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


export class SelectInputMeterOption implements ISelectInputMeterOption, IHasId {
  $id: string;
  Name!: string;
  "Condition Meter"!: ConditionMeterName | AssetConditionMeterId;
  constructor(json: Omit<ISelectInputMeterOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}


class SelectInputCustomOption implements ISelectInputCustomOption, IHasId {
  $id: string;
  Name!: string;
  Value!: string;
  constructor(json: Omit<ISelectInputCustomOption, "$id">, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}