import type { TruthClassic, TruthOptionClassic , YamlStub, YamlStubNode } from "@schema";


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