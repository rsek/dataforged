import { DisplayBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { Game } from '@schema'
import type { Display, IronlandsRegion, Source, Title, YamlIronlandsRegion } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class IronlandsRegionBuilder implements IronlandsRegion {
  $id: string
  Title: Title
  Summary: string
  Display: Display
  Source: Source
  Features: string[]
  Tags?: string[] | undefined
  Description: string
  'Quest starter': string

  constructor (yaml: YamlIronlandsRegion, rootSource: Source) {
    const fragment = yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical
    this.$id = formatId(fragment, Game.Ironsworn, 'Regions')
    this.Title = new TitleBuilder(yaml.Title, this)
    this.Display = new DisplayBuilder({ })
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), rootSource)
    this.Features = yaml.Features
    this.Summary = yaml.Summary
    this.Description = yaml.Description
  }
}
