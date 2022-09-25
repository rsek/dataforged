import type { CustomStatOption } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class CustomStatOptionBuilder implements CustomStatOption {
  $id: CustomStatOption["$id"];
  Label: string;
  Value: number;
  constructor(json: Omit<CustomStatOption, "$id">, parentId: CustomStatOption["$id"]) {
    this.$id = formatId(json.Label, parentId);
    this.Label = json.Label;
    this.Value = json.Value;
  }
}