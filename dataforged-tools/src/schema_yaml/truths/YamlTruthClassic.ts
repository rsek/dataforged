import type { SettingTruthClassic , SettingTruthOptionClassic } from "@schema_json";
import type { YamlStub , YamlStubNode } from "@schema_yaml";


/**
 * @internal
 */
export interface YamlSettingTruthClassic extends YamlStubNode<SettingTruthClassic, "", "Options"> {
  Options: YamlSettingTruthOptionClassic[];
}


/**
 * @internal
 */
export interface YamlSettingTruthOptionClassic extends YamlStub<SettingTruthOptionClassic> { }