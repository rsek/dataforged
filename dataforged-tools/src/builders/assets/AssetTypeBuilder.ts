import { AssetBuilder, DisplayBuilder, SourceBuilder, SourceInheritorBuilder, TitleBuilder } from '@builders'
import { Asset, AssetType, AssetUsage, Display, Game, Source, SourceTitle, Title, YamlAssetType } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AssetTypeBuilder extends SourceInheritorBuilder implements AssetType {
  $id: AssetType['$id']
  title: Title
  aliases?: string[] | undefined
  description: string
  assets: { [key: SnakeCaseString]: Asset }
  display: Display
  usage: AssetUsage
  constructor(yaml: YamlAssetType, fragment: string, game: Game, rootSource: Source) {
    super(yaml.source ?? SourceBuilder.defaultByTitle(game === 'Ironsworn' ? SourceTitle.IronswornAssets : SourceTitle.StarforgedAssets), rootSource)
    this.$id = formatId(fragment, game, 'Assets')
    this.description = yaml.description

    this.display = new DisplayBuilder({
      color: yaml.display?.color
    })

    this.title = new TitleBuilder(yaml.title, this)

    const usage = _.clone(yaml.usage ?? {}) as AssetUsage
    if (!usage.shared) {
      usage.shared = false
    }
    this.usage = usage
    this.assets = _.mapValues(yaml.assets, asset => new AssetBuilder(asset, game, this, rootSource))
  }
}
