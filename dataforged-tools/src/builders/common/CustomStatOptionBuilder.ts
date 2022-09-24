import { formatId } from "@utils";
import type { CustomStatOption } from "@schema_json";

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