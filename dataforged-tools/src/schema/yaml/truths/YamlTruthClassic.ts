import type { TruthClassic, TruthOptionClassic, YamlStub, YamlStubNode, YamlTitleCaseTitle } from '@schema'

/**
 * @internal
 */
export interface YamlTruthClassic extends YamlStubNode<TruthClassic, '', 'options'> {
  options: YamlTruthOptionClassic[]
  title: YamlTitleCaseTitle
}

/**
 * @internal
 */
export interface YamlTruthOptionClassic extends YamlStub<TruthOptionClassic> { }
