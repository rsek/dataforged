import type { IMoveReroll , IOutcomeInfo } from "@json_out/index.js";
import type { IOutcomeInfoYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class OutcomeInfo implements IOutcomeInfo {
  $id: IOutcomeInfo["$id"];
  Text: string;
  Reroll?: IMoveReroll | undefined;
  "With a Match"?: OutcomeInfo | undefined;
  "In Control"?: boolean | undefined;
  constructor(json: IOutcomeInfoYaml, id: IOutcomeInfo["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    if (json.Reroll){
      console.log("has reroll data", json.Reroll);
      this.Reroll = {
        ...json.Reroll,
        $id: this.$id + "/Reroll",
      };
    }
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeInfo(json["With a Match"], (`${this.$id}/With_a_Match`));
    }
    this["In Control"] = json["In Control"];
  }
}
