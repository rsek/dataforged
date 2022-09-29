import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { TruthClassic, TruthOptionClassic, YamlTruthOptionClassic } from '@schema'

/**
 * @internal
 */
export class TruthOptionClassicBuilder extends NodeBuilder<YamlTruthOptionClassic, TruthOptionClassic, TruthClassic> implements TruthOptionClassic {
  description: string
  quest_starter: string
  constructor (yaml: YamlTruthOptionClassic, parent: TruthClassic, index: number) {
    super(yaml, index, parent)
    this.description = yaml.description
    this.quest_starter = yaml.quest_starter
  }
}
