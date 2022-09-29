import { SourceBuilder, TitleBuilder, TruthOptionClassicBuilder } from '@builders'
import { NodeBuilder } from '@builders/NodeBuilder.js'
import { MixinId, MixinSource, Source, SourceTitle, Title, TruthClassic, TruthOptionClassic, YamlTruthClassic } from '@schema'
import { Game } from '@schema'

/**
 * @internal
 */
export class TruthClassicBuilder extends NodeBuilder<YamlTruthClassic, TruthClassic, MixinSource & MixinId> implements TruthClassic {
  title: Title
  source: Source
  options: TruthOptionClassic[]
  constructor(yaml: YamlTruthClassic, key: string, parent: MixinSource & MixinId) {
    super(yaml, key, parent)

    this.title = new TitleBuilder(yaml.title, this)
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByTitle(SourceTitle.Ironsworn), parent.source)
    this.options = yaml.options.map((option, index) => new TruthOptionClassicBuilder(option, this, index))
  }
}
