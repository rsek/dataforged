
import { is } from "typescript-is";

import type { ConditionMeterType } from "./ConditionMeter.js";
import type { IHasId, IWillHaveId } from "./Id.js";
import type { StatType } from "./Stat.js";

enum InputType {
  Text = "Text",
  Select = "Select",
  Number = "Number"
}

interface IInputBase extends IWillHaveId {
  Name: string;
  "Input Type": InputType;
  Adjustable?: boolean;
}

export type IInput = INumberInput | ISelectInput | ITextInput;

export type Input = NumberInput | SelectInput | TextInput;

export interface INumberInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Number;
  Min: number;
  Max?: number | undefined;
  Step?: number | undefined;
  "Starting Value": number;
}

export class NumberInput implements INumberInput, IHasId {
  $id: string;
  Name!: string;
  "Input Type": InputType.Number;
  Min: number = 0;
  Max?: number | undefined;
  Step: number = 1;
  "Starting Value" = 0;
  Adjustable = true;
  constructor(json: INumberInput, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

export interface ITextInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Text;
}

export class TextInput implements ITextInput, IHasId {
  $id: string;
  "Input Type": InputType.Text;
  Name!: string;
  Adjustable = false;
  constructor(json: ITextInput, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

export interface ISelectInput extends IInputBase {
  Name: string;
  "Input Type": InputType.Select;
  Options: ISelectInputOption[];
}

type AnyInputOption = AssetSelectInputStatOption | SelectInputMeterOption | SelectInputCustomOption;

export class SelectInput implements ISelectInput, IHasId {
  $id: string;
  Name: string;
  "Input Type": InputType.Select;
  Options: AnyInputOption[];
  Adjustable = false;
  constructor(json: ISelectInput, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this["Input Type"] = json["Input Type"];
    this.Options = json.Options.map(optionJson => {
      let option: AnyInputOption;
      if (is<ISelectInputStatOption>(optionJson)) {
        option = new AssetSelectInputStatOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      } else if (is<ISelectInputMeterOption>(optionJson)) {
        option = new SelectInputMeterOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      } else if (is<ISelectInputCustomOption>(optionJson)) {
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
  Stat!: StatType;
  constructor(json: ISelectInputStatOption, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

export type ISelectInputOption = ISelectInputStatOption | ISelectInputMeterOption | ISelectInputCustomOption;

interface ISelectInputOptionBase {
  Name: string;
}

interface ISelectInputStatOption extends ISelectInputOptionBase {
  Stat: StatType;
}

interface ISelectInputMeterOption extends ISelectInputOptionBase {
  "Condition Meter": ConditionMeterType;
}

export class SelectInputMeterOption implements ISelectInputMeterOption, IHasId {
  $id: string;
  Name!: string;
  "Condition Meter"!: ConditionMeterType;
  constructor(json: ISelectInputMeterOption, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

interface ISelectInputCustomOption extends ISelectInputOptionBase {
  Value: string;
}

class SelectInputCustomOption implements ISelectInputCustomOption, IHasId {
  $id: string;
  Name!: string;
  Value!: string;
  constructor(json: ISelectInputCustomOption, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}