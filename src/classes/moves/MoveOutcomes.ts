import MoveOutcome from "@dataforged/classes/moves/MoveOutcome.js";
import type { IMoveOutcome } from "@dataforged/interfaces/json_out/moves/IMoveOutcome.js";
import type { IMoveOutcomes } from "@dataforged/interfaces/json_out/moves/IMoveOutcomes.js";

export default class MoveOutcomes implements IMoveOutcomes {
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