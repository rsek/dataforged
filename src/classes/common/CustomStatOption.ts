import type { ICustomStatOption } from "@json_out/index.js";

export class CustomStatOption implements ICustomStatOption {
  $id: string;
  Name: string;
  Value: number;
  constructor(json: Omit<ICustomStatOption, "$id">, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Value = json.Value;
  }
}