import { DisplayBuilder, SourceBuilder, SuggestionsBuilder, TitleBuilder, TruthOptionStarforgedBuilder } from '@builders'
import type { Display, Source, Suggestions, Title, TruthOptionStarforged, TruthStarforged, YamlTruthStarforged } from '@schema'
import { Game } from '@schema'
import { formatId } from '@utils'
import { buildLog } from '@utils/logging/buildLog.js'

/**
 * @internal
 */
export class TruthStarforgedBuilder implements TruthStarforged {
  $id: TruthStarforged['$id']
  Title: Title
  Table: TruthOptionStarforged[]
  Character: string
  Suggestions?: Suggestions | undefined
  Display: Display
  Source: Source
  constructor (yaml: YamlTruthStarforged, parentSource: Source) {
    const game = Game.Starforged
    const fragment = yaml._idFragment ?? yaml.Title.Canonical
    this.$id = formatId(fragment, game, 'Setting_truths')
    buildLog(this.constructor, `Building: ${this.$id}`)
    this.Title = new TitleBuilder(yaml.Title, this)
    this.Table = yaml.Table.map(row => new TruthOptionStarforgedBuilder(this.$id, row))
    this.Display = new DisplayBuilder({
      Icon: yaml.Display?.Icon
    })
    this.Character = yaml.Character
    this.Suggestions = (yaml.Suggestions != null) ? new SuggestionsBuilder(yaml.Suggestions) : undefined
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(game), parentSource)
  }
}
