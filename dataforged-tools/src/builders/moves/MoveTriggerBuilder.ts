import { MoveTriggerOptionActionBuilder, MoveTriggerOptionProgressBuilder } from '@builders'
import type { AlterMove, Move, MoveTrigger, MoveTriggerBy, MoveTriggerOptionAction, MoveTriggerOptionProgress, YamlAlterMoveTrigger, YamlMoveTrigger, YamlMoveTriggerOptionAction, YamlMoveTriggerOptionProgress } from '@schema'
import { RollType } from '@schema'
import { formatId } from '@utils'

// TODO: add ironsworn moves, or have the constructor use move data to figure it out

const progressMoves = [ 'fulfill_your_vow', 'forge_a_bond', 'finish_an_expedition', 'take_decisive_action', 'overcome_destruction', 'continue_a_legacy', 'finish_the_scene', 'reach_your_destination', 'write_your_epilogue' ]

/**
 * @internal
 */
export class MoveTriggerBuilder implements MoveTrigger {
  $id: MoveTrigger['$id']
  'Options'?: Array<MoveTriggerOptionAction|MoveTriggerOptionProgress> | undefined
  Text?: string | undefined
  By?: MoveTriggerBy | undefined
  constructor (yaml: YamlMoveTrigger|YamlAlterMoveTrigger, parent: AlterMove|Move) {
    this.$id = formatId('Trigger', parent.$id)
    this.Text = yaml.Text
    if (this.$id.includes('alter/moves')) {
      this.By = yaml.By ?? { Player: true, Ally: false }
    }
    if (yaml.Options !== null) {
      let progressMove = false
      if (parent['Progress move'] ?? (parent as AlterMove).Moves?.some(item => progressMoves.includes(item))) {
        progressMove = true
      }
      this.Options = yaml.Options?.map((option, index) => {
        if (!option['Roll type']) {
          option['Roll type'] = progressMove ? RollType.Progress : RollType.Action
        }
        if (!progressMove && (parent as AlterMove).Moves?.some(item => progressMoves.includes(item))) {
          throw Error("References a progress move, but isn't set to 'Progress roll'")
        }
        switch (option['Roll type']) {
          case RollType.Action:
            return new MoveTriggerOptionActionBuilder(option as YamlMoveTriggerOptionAction, this, index)
          case RollType.Progress:
            return new MoveTriggerOptionProgressBuilder(option as YamlMoveTriggerOptionProgress, this, index)
          default:
            throw Error(`Unrecognized roll type in: ${JSON.stringify(option)}`)
        }
      })
    }
  }
}
