import type { ISettingTruthClassic } from "@json_out/index.js";
import type { ISettingTruthOptionClassicYaml, YamlStub } from "@yaml_in/index.js";


/**
 * @internal
 */
export interface ISettingTruthClassicYaml extends YamlStub<ISettingTruthClassic, "", "Options"> {
  Options: ISettingTruthOptionClassicYaml[];
}
