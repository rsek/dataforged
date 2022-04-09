import { MoveOutcome } from "@classes/index.js";
import type { IMoveOutcome, IMoveOutcomes } from "@json_out/index.js";

export class MoveOutcomes implements IMoveOutcomes {
  $id: string; // FIXME: outcome ID
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
  constructor(json: Omit<IMoveOutcomes, "$id">, id: string) {
    this.$id = id;
    this["Strong Hit"] = new MoveOutcome(json["Strong Hit"], `${this.$id} / Strong Hit`);
    this["Weak Hit"] = new MoveOutcome(json["Weak Hit"], `${this.$id} / Weak Hit`);
    this["Miss"] = new MoveOutcome(json["Miss"], `${this.$id} / Miss`);
  }
}