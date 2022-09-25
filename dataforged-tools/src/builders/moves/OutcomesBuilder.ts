import { OutcomeMissBuilder, OutcomeStrongHitBuilder, OutcomeWeakHitBuilder } from "@builders";
import type { AlterMoveOutcomes, Outcomes } from "@schema_json";
import type { YamlAlterMoveOutcomes, YamlOutcomes } from "@schema_yaml";
import { formatId } from "@utils/formatId.js";

/**
 * @internal
 */
export class OutcomesBuilder implements Outcomes {
  $id: Outcomes["$id"];
  "Strong Hit": OutcomeStrongHitBuilder<true>;
  "Weak Hit": OutcomeWeakHitBuilder<true>;
  "Miss": OutcomeMissBuilder<true>;
  constructor(json: YamlOutcomes, id: Outcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new OutcomeStrongHitBuilder<true>(json["Strong Hit"], this.$id);
    this["Weak Hit"] = new OutcomeWeakHitBuilder<true>(json["Weak Hit"], this.$id);
    this["Miss"] = new OutcomeMissBuilder<true>(json["Miss"], this.$id);
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomesBuilder implements AlterMoveOutcomes {
  $id: Outcomes["$id"];
  "Strong Hit"?: OutcomeStrongHitBuilder<false> | undefined;
  "Weak Hit"?: OutcomeWeakHitBuilder<false> | undefined;
  "Miss"?: OutcomeMissBuilder<false> | undefined;
  constructor(json: YamlAlterMoveOutcomes, parentId: string) {
    this.$id = formatId("Outcomes",parentId);

    if (json["Strong Hit"]) {
      this["Strong Hit"] = new OutcomeStrongHitBuilder<false>(json["Strong Hit"], this.$id);
    }
    if (json["Weak Hit"]) {
      this["Weak Hit"] = new OutcomeWeakHitBuilder<false>(json["Weak Hit"], this.$id);
    }
    if (json["Miss"]) {
      this["Miss"] = new OutcomeMissBuilder<false>(json["Miss"], this.$id);
    }
  }
}