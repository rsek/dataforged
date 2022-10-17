import { SourceBuilder, TitleBuilder, TruthOptionClassicBuilder } from '@builders'
import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { MixinId, MixinSource, Source, Title, TruthClassic, TruthOptionClassic, YamlTruthClassic } from '@schema'
import { SourceTitle } from '@schema'

/**
 * @internal
 */
// @ts-expect-error
export class TruthClassicBuilder extends NodeBuilder<YamlTruthClassic, TruthClassic, MixinSource & MixinId> implements TruthClassic {
  title: Title
  // @ts-expect-error
  source: Source
  options: TruthOptionClassic[]
  constructor (yaml: YamlTruthClassic, key: string, parent: MixinSource & MixinId) {
    // @ts-expect-error
    super(yaml, key, parent)

    this.title = new TitleBuilder(yaml.title, this)
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByTitle(SourceTitle.Ironsworn), parent.source)
    this.options = yaml.options.map((option, index) => new TruthOptionClassicBuilder(option, this, index))
  }
}
