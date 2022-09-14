import type { ICustomStatOption } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";

/**
 * @internal
 */
export class CustomStatOption implements ICustomStatOption {
  $id: ICustomStatOption["$id"];
  Label: string;
  Value: number;
  constructor(json: Omit<ICustomStatOption, "$id">, parentId: ICustomStatOption["$id"]) {
    this.$id = `${parentId}/${formatIdFragment(json.Label)}`;
    this.Label = json.Label;
    this.Value = json.Value;
  }
}