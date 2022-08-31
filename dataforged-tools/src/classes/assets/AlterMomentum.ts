import type { IAlterMomentum, IAlterMomentumBurn, IAlterMomentumReset, IAssetAbility, IHasText } from "@json_out/index.js";
import type { IAlterMomentumBurnYaml, IAlterMomentumResetYaml, IAlterMomentumYaml, YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export class AlterMomentum implements IAlterMomentum {
  Burn?: IAlterMomentumBurn[] | undefined;
  Reset?: IAlterMomentumReset[] | undefined;
  $id: string;
  constructor(json: IAlterMomentumYaml, parent: IAssetAbility) {
    this.$id = parent.$id + "/Alter_Momentum";
    if (json.Burn) {
      this.Burn = json.Burn.map(burnData => new AlterMomentumBurn(burnData, this));
    }
    if (json.Reset) {
      this.Reset = json.Reset.map(resetData => new AlterMomentumReset(resetData, this));
    }
  }
}
/**
 * @internal
 */
export class AlterMomentumBurn implements IAlterMomentumBurn {
  Trigger: IHasText;
  Effect: IHasText;
  Outcomes?: ("Weak Hit" | "Strong Hit")[] | undefined;
  $id: string;
  constructor(json: IAlterMomentumBurnYaml, parent: IAlterMomentum) {
    this.$id = parent.$id + "/Burn";
    this.Trigger = { ...json.Trigger,$id: this.$id + "/Trigger" };
    this.Effect = { ...json.Effect,$id: this.$id + "/Effect" };
    this.Outcomes = json.Outcomes;
  }
}
/**
 * @internal
 */
export class AlterMomentumReset implements IAlterMomentumReset {
  Trigger: IHasText;
  Value: number;
  $id: string;
  constructor(json: IAlterMomentumResetYaml, parent: IAlterMomentum) {
    this.$id = parent.$id + "/Reset";
    this.Trigger = { ...json.Trigger,$id: this.$id + "/Trigger" };
    this.Value = json.Value;
  }
}