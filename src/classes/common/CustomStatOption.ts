import type ICustomStatOption from "@dataforged/interfaces/json_out/assets/ICustomStatOption.js";

export default class CustomStatOption implements ICustomStatOption {
  $id: string;
  Name: string;
  Value: number;
  constructor(json: Omit<ICustomStatOption, "$id">, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Value = json.Value;
  }
}