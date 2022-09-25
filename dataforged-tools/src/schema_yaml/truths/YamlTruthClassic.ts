import type { TruthClassic , TruthOptionClassic } from "@schema_json";
import type { YamlStub , YamlStubNode } from "@schema_yaml";


/**
 * @internal
 */
export interface YamlTruthClassic extends YamlStubNode<TruthClassic, "", "Options"> {
  Options: YamlTruthOptionClassic[];
}


/**
 * @internal
 */
export interface YamlTruthOptionClassic extends YamlStub<TruthOptionClassic> { }