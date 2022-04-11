import type { ICustomStatOption } from "@json_out/index.js";

/**
 * @internal
 */
export class CustomStatOption implements ICustomStatOption {
  $id: ICustomStatOption["$id"];
  Name: string;
  Value: number;
  constructor(json: Omit<ICustomStatOption, "$id">, id: ICustomStatOption["$id"]) {
    this.$id = id;
    this.Name = json.Name;
    this.Value = json.Value;
  }
}