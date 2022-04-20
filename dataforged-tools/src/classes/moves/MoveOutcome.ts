import type { IMoveOutcome } from "@json_out/index.js";

/**
 * @internal
 */
export class MoveOutcome implements IMoveOutcome {
  $id: IMoveOutcome["$id"];
  Text: string;
  "With a Match"?: MoveOutcome | undefined;
  constructor(json: Omit<IMoveOutcome, "$id">, id: IMoveOutcome["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcome(json["With a Match"], (`${this.$id}/With_a_Match` as IMoveOutcome["$id"]));
    }
  }
}
