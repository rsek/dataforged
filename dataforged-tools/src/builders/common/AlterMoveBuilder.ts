import { AlterMoveOutcomesBuilder, MoveTriggerBuilder } from '@builders'
import type { AlterMove, AlterMoveOutcomes, AssetAbility, Move, MoveTrigger, YamlAlterMove } from '@schema'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AlterMoveBuilder implements AlterMove {
  $id: AlterMove['$id']
  moves?: Move['$id'][] | null | undefined
  alters?: AlterMove['$id'][] | undefined
  trigger?: MoveTrigger | undefined
  text?: string | undefined
  outcomes?: AlterMoveOutcomes | undefined
  constructor (yaml: YamlAlterMove, parent: AssetAbility, index: number) {
    this.$id = formatId((index + 1).toString(), parent.$id, 'Alter_Moves')
    this.alters = yaml.alters
    this.moves = yaml.moves
    if (yaml.trigger != null) {
      const triggerClone = _.cloneDeep(yaml.trigger)
      this.trigger = new MoveTriggerBuilder(triggerClone, this)
    }
    this.text = yaml.text
    if (yaml.outcomes != null) {
      this.outcomes = new AlterMoveOutcomesBuilder(yaml.outcomes, this.$id)
    }
  }
}
