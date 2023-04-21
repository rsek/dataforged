import type { DelveRarity, YamlStubNode, YamlTitleCaseTitle } from '@schema'

/**
 * @internal
 */
export interface YamlDelveRarity extends YamlStubNode<DelveRarity> {
  title: YamlTitleCaseTitle
}
