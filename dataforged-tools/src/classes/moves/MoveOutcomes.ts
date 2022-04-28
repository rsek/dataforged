import { OutcomeInfo } from "@classes/index.js";
import type { IMoveOutcomes, IOutcomeInfo } from "@json_out/index.js";

/**
 * @internal
 */
export class MoveOutcomes implements IMoveOutcomes {
  $id: IMoveOutcomes["$id"];
  "Strong Hit": IOutcomeInfo;
  "Weak Hit": IOutcomeInfo;
  "Miss": IOutcomeInfo;
  constructor(json: Omit<IMoveOutcomes, "$id">, id: IMoveOutcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new OutcomeInfo(json["Strong Hit"], `${this.$id}/Strong_Hit`);
    this["Weak Hit"] = new OutcomeInfo(json["Weak Hit"], `${this.$id}/Weak_Hit`);
    this["Miss"] = new OutcomeInfo(json["Miss"], `${this.$id}/Miss`);
  }
}