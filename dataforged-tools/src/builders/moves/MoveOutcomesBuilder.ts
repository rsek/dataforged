import { MoveOutcomeMissBuilder, MoveOutcomeStrongHitBuilder, MoveOutcomeWeakHitBuilder } from "@builders";
import type { AlterMoveOutcomes, MoveOutcomes } from "@schema_json";
import { formatId } from "@utils/formatId.js";
import type { YamlAlterMoveOutcomes, YamlMoveOutcomes } from "@schema_yaml";

/**
 * @internal
 */
export class MoveOutcomesBuilder implements MoveOutcomes {
  $id: MoveOutcomes["$id"];
  "Strong Hit": MoveOutcomeStrongHitBuilder<true>;
  "Weak Hit": MoveOutcomeWeakHitBuilder<true>;
  "Miss": MoveOutcomeMissBuilder<true>;
  constructor(json: YamlMoveOutcomes, id: MoveOutcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new MoveOutcomeStrongHitBuilder<true>(json["Strong Hit"], this.$id);
    this["Weak Hit"] = new MoveOutcomeWeakHitBuilder<true>(json["Weak Hit"], this.$id);
    this["Miss"] = new MoveOutcomeMissBuilder<true>(json["Miss"], this.$id);
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomesBuilder implements AlterMoveOutcomes {
  $id: MoveOutcomes["$id"];
  "Strong Hit"?: MoveOutcomeStrongHitBuilder<false> | undefined;
  "Weak Hit"?: MoveOutcomeWeakHitBuilder<false> | undefined;
  "Miss"?: MoveOutcomeMissBuilder<false> | undefined;
  constructor(json: YamlAlterMoveOutcomes, parentId: string) {
    this.$id = formatId("Outcomes",parentId);

    if (json["Strong Hit"]) {
      this["Strong Hit"] = new MoveOutcomeStrongHitBuilder<false>(json["Strong Hit"], this.$id);
    }
    if (json["Weak Hit"]) {
      this["Weak Hit"] = new MoveOutcomeWeakHitBuilder<false>(json["Weak Hit"], this.$id);
    }
    if (json["Miss"]) {
      this["Miss"] = new MoveOutcomeMissBuilder<false>(json["Miss"], this.$id);
    }
  }
}