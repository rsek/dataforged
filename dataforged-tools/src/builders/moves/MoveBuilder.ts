import { DisplayBuilder, MoveTriggerBuilder, OutcomesBuilder, SourceBuilder, SourceInheritorBuilder, TitleBuilder } from '@builders'
import type { Asset, AssetAbility, Display, Game, Move, MoveCategory, MoveTrigger, OracleTable, Outcomes, Source, Suggestions, Title, YamlMove } from '@schema'
import { formatId } from '@utils'
import { buildLog } from '@utils/logging/buildLog.js'
/**
 * Object representing a Starforged move.
 * @internal
 */
export class MoveBuilder extends SourceInheritorBuilder implements Move {
  $id: Move['$id']
  title: Title
  optional: boolean
  category: MoveCategory['$id']
  asset?: this['category'] extends `${Game}/Moves/Assets` ? Asset['$id'] : undefined
  'progress_move'?: boolean | undefined
  'variant_of'?: Move['$id'] | undefined
  display: Display
  trigger: MoveTrigger
  text: string
  tags?: string[] | undefined
  oracles?: Array<OracleTable['$id']> | undefined
  suggestions?: Suggestions | undefined
  outcomes?: Outcomes | undefined
  constructor(yaml: YamlMove, parent: MoveCategory | AssetAbility, game: Game, ...sourceAncestors: Source[]) {
    super(yaml.source ?? SourceBuilder.defaultByGame(game), ...sourceAncestors)
    this.category = yaml.category ?? `${game}/Moves/Assets`
    const fragment = yaml._idFragment ?? yaml.title.canonical
    this.$id = yaml.$id ?? formatId(fragment, this.category)
    buildLog(this.constructor, `Building: ${this.$id}`)
    this.title = new TitleBuilder(yaml.title, this)
    this.optional = yaml.optional ?? false
    if (this.category === ('Starforged/Moves/Assets' || 'Ironsworn/Moves/Assets')) {
      if (!yaml.asset) {
        throw new Error('Expected an asset ID')
      }
      this.asset = yaml.asset as typeof this.asset
    }
    this.tags = yaml.tags
    this.progress_move = yaml.progress_move
    this.variant_of = yaml.variant_of

    this.display = new DisplayBuilder({
      color: yaml.display?.color ?? (parent as MoveCategory).display?.color
    })

    this.trigger = new MoveTriggerBuilder(yaml.trigger, this)
    this.text = yaml.text
    this.oracles = yaml.oracles

    this.outcomes = (yaml.outcomes != null) ? new OutcomesBuilder(yaml.outcomes, formatId('Outcomes', this.$id)) : undefined
  }
}
