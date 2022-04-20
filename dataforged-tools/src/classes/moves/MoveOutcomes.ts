import { MoveOutcome } from "@classes/index.js";
import type { IMoveOutcome, IMoveOutcomes } from "@json_out/index.js";

/**
 * @internal
 */
export class MoveOutcomes implements IMoveOutcomes {
  $id: IMoveOutcomes["$id"]; // FIXME: outcome ID
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
  constructor(json: Omit<IMoveOutcomes, "$id">, id: IMoveOutcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new MoveOutcome(json["Strong Hit"], `${this.$id}/Strong_Hit`);
    this["Weak Hit"] = new MoveOutcome(json["Weak Hit"], `${this.$id}/Weak_Hit`);
    this["Miss"] = new MoveOutcome(json["Miss"], `${this.$id}/Miss`);
  }
}