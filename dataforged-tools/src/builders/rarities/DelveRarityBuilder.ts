import { DisplayBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { Asset, DelveRarity, Display, Source, SourceTitle, Title, YamlDelveRarity } from '@schema'
import { Game } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class DelveRarityBuilder implements DelveRarity {
  $id: string
  'xp_cost': number
  asset: Asset['$id']
  title: Title
  display: Display
  source: Source
  description: string
  constructor(yaml: YamlDelveRarity, fragment: string) {
    this.$id = formatId(fragment, 'Ironsworn', 'Rarities')
    this.xp_cost = yaml.xp_cost
    this.asset = yaml.asset
    this.title = new TitleBuilder(yaml.title, this)
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByTitle(SourceTitle.IronswornDelve))
    this.display = new DisplayBuilder({})
    this.description = yaml.description
  }
}
