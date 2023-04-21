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
  title: Title
  table: TruthOptionStarforged[]
  character: string
  suggestions?: Suggestions | undefined
  display: Display
  source: Source
  constructor (yaml: YamlTruthStarforged, parentSource: Source) {
    const game = Game.Starforged
    const fragment = yaml._idFragment ?? yaml.title.canonical
    this.$id = formatId(fragment, game, 'Setting_truths')
    buildLog(this.constructor, `Building: ${this.$id}`)
    this.title = new TitleBuilder(yaml.title, this)
    // @ts-expect-error
    this.table = yaml.table.map((row, index) => new TruthOptionStarforgedBuilder(row, index, this))
    this.display = new DisplayBuilder({
      icon: yaml.display?.icon
    })
    this.character = yaml.character
    this.suggestions = (yaml.suggestions != null) ? new SuggestionsBuilder(yaml.suggestions) : undefined
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(game), parentSource)
  }
}
