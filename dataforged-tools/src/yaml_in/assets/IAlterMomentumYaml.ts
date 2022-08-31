import type { IAlterMomentum, IAlterMomentumBurn, IAlterMomentumReset } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IAlterMomentumYaml extends YamlStub<IAlterMomentum, "", "Burn" | "Reset"> {
  Burn?: IAlterMomentumBurnYaml[] | undefined;
  Reset?: IAlterMomentumResetYaml[] | undefined;
}

/**
 * @internal
 */
export interface IAlterMomentumBurnYaml extends YamlStub<IAlterMomentumBurn, "", "Trigger"|"Effect"> {
  Trigger: Omit<IAlterMomentumBurn["Trigger"], "$id">
  Effect: Omit<IAlterMomentumBurn["Effect"], "$id">
}


/**
 * @internal
 */
export interface IAlterMomentumResetYaml extends YamlStub<IAlterMomentumReset,"", "Trigger"> {
  Trigger: Omit<IAlterMomentumReset["Trigger"], "$id">
 }
