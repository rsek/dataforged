import { AssetBuilder, DisplayBuilder, SourceBuilder, SourceInheritorBuilder, TitleBuilder } from '@builders'
import type { Asset, AssetType, AssetUsage, Display, Game, Source, Title, YamlAssetType } from '@schema'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AssetTypeBuilder extends SourceInheritorBuilder implements AssetType {
  $id: AssetType['$id']
  Title: Title
  Aliases?: string[] | undefined
  Description: string
  Assets: {[key: string]: Asset}
  Display: Display
  Usage: AssetUsage
  constructor (yaml: YamlAssetType, fragment: string, game: Game, rootSource: Source) {
    super(yaml.Source ?? SourceBuilder.default(game), rootSource)
    this.$id = formatId(fragment, game, 'Assets')
    this.Aliases = yaml.Aliases
    this.Description = yaml.Description

    this.Display = new DisplayBuilder({
      Color: yaml.Display?.Color
    })

    this.Title = new TitleBuilder(yaml.Title, this)

    const usage = _.clone(yaml.Usage ?? {}) as AssetUsage
    if (!usage.Shared) {
      usage.Shared = false
    }
    this.Usage = usage
    this.Assets = _.mapValues(yaml.Assets, asset => new AssetBuilder(asset, game, this, rootSource))
  }
}
