import t from 'ts-runtime/lib';

import { ConditionMeterType } from "./ConditionMeter";
import { IHasId, IWillHaveId } from "./Id";
import { StatType } from "./Stat";

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

export type Input = NumberInput | SelectInput | Text;

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

export function isTextInput(json: IInput | undefined): json is ITextInput {
  return json?.["Input Type"] == "Text";
};

export function isNumberInput(json: IInput | undefined): json is INumberInput {
  return json?.["Input Type"] == "Number";
};

export function isSelectInput(json: IInput | undefined): json is ISelectInput {
  return json?.["Input Type"] == "Select";
};

export function isStatOption(json: ISelectInputOption | undefined): json is ISelectInputStatOption {
  if (json && Object.keys(json).includes("Stat")) { return true; }
  return false;
};

export function isMeterOption(json: ISelectInputOption | undefined): json is ISelectInputMeterOption {
  if (json && Object.keys(json).includes("Condition Meter")) { return true; }
  return false;
};

export function isCustomOption(json: ISelectInputOption | undefined): json is ISelectInputCustomOption {
  if (json && Object.keys(json).includes("Custom value")) { return true; }
  return false;
};

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
      if (isStatOption(optionJson)) {
        option = new AssetSelectInputStatOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      }
      else if (isMeterOption(optionJson)) {
        option = new SelectInputMeterOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);

      }
      else if (isCustomOption(optionJson)) {
        option = new SelectInputCustomOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
      }
      else { throw new Error("Unable to construct select input options - check the data!"); }
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