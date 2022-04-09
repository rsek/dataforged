import type { IMoveOutcome, ParagraphsString } from "@json_out/index.js";

export class MoveOutcome implements IMoveOutcome {
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
