import type { AlterMomentum, AlterMomentumBurn , AlterMomentumReset, AssetAbility, HasText } from "@schema_json";
import type { YamlAlterMomentum, YamlAlterMomentumBurn, YamlAlterMomentumReset } from "@schema_yaml";
import { formatId } from "@utils";

/**
 * @internal
 */
export class AlterMomentumBuilder implements AlterMomentum {
  Burn?: AlterMomentumBurn[] | undefined;
  Reset?: AlterMomentumReset[] | undefined;
  $id: string;
  constructor(json: YamlAlterMomentum, parent: AssetAbility) {
    this.$id = formatId(parent.$id,"Alter_Momentum");
    if (json.Burn) {
      this.Burn = json.Burn.map(burnData => new AlterMomentumBurnBuilder(burnData, this));
    }
    if (json.Reset) {
      this.Reset = json.Reset.map(resetData => new AlterMomentumResetBuilder(resetData, this));
    }
  }
}
/**
 * @internal
 */
export class AlterMomentumBurnBuilder implements AlterMomentumBurn {
  Trigger: HasText;
  Effect: HasText;
  Outcomes?: ("Weak Hit" | "Strong Hit")[] | undefined;
  $id: string;
  constructor(json: YamlAlterMomentumBurn, parent: AlterMomentum) {
    this.$id = parent.$id + "/Burn";
    this.Trigger = { ...json.Trigger,$id: this.$id + "/Trigger" };
    this.Effect = { ...json.Effect,$id: this.$id + "/Effect" };
    this.Outcomes = json.Outcomes;
  }
}
/**
 * @internal
 */
export class AlterMomentumResetBuilder implements AlterMomentumReset {
  Trigger: HasText;
  Value: number;
  $id: string;
  constructor(json: YamlAlterMomentumReset, parent: AlterMomentum) {
    this.$id = parent.$id + "/Reset";
    this.Trigger = { ...json.Trigger,$id: this.$id + "/Trigger" };
    this.Value = json.Value;
  }
}