import type { TruthClassic, TruthOptionClassic, YamlStub, YamlStubNode, YamlTitleCaseTitle } from '@schema'

/**
 * @internal
 */
export interface YamlTruthClassic extends YamlStubNode<TruthClassic, '', 'Options'> {
  Options: YamlTruthOptionClassic[]
  Title: YamlTitleCaseTitle
}

/**
 * @internal
 */
export interface YamlTruthOptionClassic extends YamlStub<TruthOptionClassic> { }
