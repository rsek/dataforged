import type { IMoveReroll , IOutcomeInfo } from "@json_out/index.js";

/**
 * @internal
 */
export class OutcomeInfo implements IOutcomeInfo {
  $id: IOutcomeInfo["$id"];
  Text: string;
  Reroll?: IMoveReroll | undefined;
  "With a Match"?: OutcomeInfo | undefined;
  "In Control"?: boolean | undefined;
  constructor(json: Omit<IOutcomeInfo, "$id">, id: IOutcomeInfo["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    this.Reroll = json.Reroll;
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeInfo(json["With a Match"], (`${this.$id}/With_a_Match`));
    }
    this["In Control"] = json["In Control"];
  }
}
