import type IMoveOutcome from "@dataforged/interfaces/json_out/moves/IMoveOutcome.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

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
