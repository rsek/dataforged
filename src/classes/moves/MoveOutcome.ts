import type { ParagraphsString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { IMoveOutcome } from "@dataforged/interfaces/json_out/moves/IMoveOutcome.js";

export default class MoveOutcome implements IMoveOutcome {
  $id: string;
  Text: ParagraphsString;
  "With a Match"?: MoveOutcome | undefined;
  constructor(json: Omit<IMoveOutcome, "$id">, id: string) {
    this.$id = id;
    this.Text = json.Text;
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcome(json["With a Match"], `${this.$id} / With a Match`);
    }
  }
}
