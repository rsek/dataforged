import { DisplayBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { Game } from '@schema'
import type { Display, IronlandsRegion, Source, Title, YamlIronlandsRegion } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class IronlandsRegionBuilder implements IronlandsRegion {
  $id: string
  title: Title
  summary: string
  display: Display
  source: Source
  features: string[]
  tags?: string[] | undefined
  description: string
  quest_starter: string

  constructor(yaml: YamlIronlandsRegion, rootSource: Source) {
    const fragment = yaml._idFragment ?? yaml.title.short ?? yaml.title.standard ?? yaml.title.canonical
    this.$id = formatId(fragment, Game.Ironsworn, 'regions')
    this.title = new TitleBuilder(yaml.title, this)
    this.display = new DisplayBuilder({})
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(Game.Ironsworn), rootSource)
    this.features = yaml.features
    this.summary = yaml.summary
    this.description = yaml.description
    this.quest_starter = yaml.quest_starter;
  }
}
