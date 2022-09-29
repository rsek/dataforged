import { DisplayBuilder, MoveBuilder, SourceBuilder, TitleBuilder } from '@builders'
import type { Display, Game, Move, MoveCategory, Source, Title, YamlMoveCategory } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class MoveCategoryBuilder implements MoveCategory {
  $id: MoveCategory['$id']
  title: Title
  source: Source
  description: string
  moves: { [key: SnakeCaseString]: Move }
  display: Display
  optional: boolean
  constructor(yaml: YamlMoveCategory, game: Game, ...ancestorSourceJson: Source[]) {
    if (!yaml.title.canonical) {
      throw new Error(`Missing a title field: ${JSON.stringify(yaml)}`)
    }
    const fragment = yaml._idFragment ?? yaml.title.canonical
    this.$id = formatId(fragment, game, 'Moves')
    this.title = new TitleBuilder(yaml.title, this)
    this.description = yaml.description
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(game), ...ancestorSourceJson)
    this.display = new DisplayBuilder(yaml.display ?? {})
    this.optional = yaml.optional ?? false
    this.moves = _.mapValues(yaml.moves, move => {
      move.category = this.$id
      return new MoveBuilder(move, this, game, this.source, ...ancestorSourceJson)
    })
  }
}
