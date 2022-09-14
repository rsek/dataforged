import { OutcomeMiss, OutcomeStrongHit, OutcomeWeakHit } from "@classes/index.js";
import type { IAlterMoveOutcomes, IMoveOutcomes } from "@json_out/index.js";
import type { IAlterMoveOutcomesYaml, IMoveOutcomesYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class MoveOutcomes implements IMoveOutcomes {
  $id: IMoveOutcomes["$id"];
  "Strong Hit": OutcomeStrongHit;
  "Weak Hit": OutcomeWeakHit;
  "Miss": OutcomeMiss;
  constructor(json: IMoveOutcomesYaml, id: IMoveOutcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new OutcomeStrongHit(json["Strong Hit"], this.$id);
    this["Weak Hit"] = new OutcomeWeakHit(json["Weak Hit"], this.$id);
    this["Miss"] = new OutcomeMiss(json["Miss"], this.$id);
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomes implements IAlterMoveOutcomes {
  $id: IMoveOutcomes["$id"];
  "Strong Hit"?: OutcomeStrongHit | undefined;
  "Weak Hit"?: OutcomeWeakHit | undefined;
  "Miss"?: OutcomeMiss | undefined;
  constructor(json: IAlterMoveOutcomesYaml, id: IMoveOutcomes["$id"]) {
    this.$id = id;

    if (json["Strong Hit"]) {
      this["Strong Hit"] = new OutcomeStrongHit(json["Strong Hit"], this.$id);
    }
    if (json["Weak Hit"]) {
      this["Weak Hit"] = new OutcomeWeakHit(json["Weak Hit"], this.$id);
    }
    if (json["Miss"]) {
      this["Miss"] = new OutcomeMiss(json["Miss"], this.$id);
    }
  }
}