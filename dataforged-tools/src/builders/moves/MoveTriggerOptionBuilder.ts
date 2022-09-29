import { CustomStatBuilder } from '@builders'
import type { CustomStat, MoveTrigger, MoveTriggerOptionAction, MoveTriggerOptionBase, MoveTriggerOptionProgress, ProgressTypeClassic, ProgressTypeStarforged, RollableStat, YamlMoveTriggerOptionAction, YamlMoveTriggerOptionProgress } from '@schema'
import { Replacement, RollMethod, RollType } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export abstract class MoveTriggerOptionBuilder implements MoveTriggerOptionBase {
  $id: MoveTriggerOptionBase['$id']
  text?: string | undefined
  'roll_type': RollType
  method: RollMethod
  using: Array<RollableStat | ProgressTypeStarforged | ProgressTypeClassic>
  'custom_stat'?: CustomStat | undefined
  constructor (yaml: YamlMoveTriggerOptionAction | YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    this.$id = formatId((index + 1).toString(), parent.$id, 'Options')
    this.text = yaml.text
    this.roll_type = yaml.roll_type ?? RollType.Action
    this.method = yaml.method ?? RollMethod.Any
    this.using = (yaml.using as typeof this['using']) ?? []
    if (yaml.custom_stat != null) {
      this.custom_stat = new CustomStatBuilder(yaml.custom_stat, this.$id)
      if (this.using && this.custom_stat) {
        this.using = this.using.map(item => (item) === Replacement.CustomStat ? this.custom_stat?.$id : item) as typeof this['using']
      }
    }
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionActionBuilder extends MoveTriggerOptionBuilder implements MoveTriggerOptionAction {
  'roll_type': RollType.Action
  using!: RollableStat[]
  constructor (yaml: YamlMoveTriggerOptionAction, parent: MoveTrigger, index: number) {
    super(yaml, parent, index)
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionProgressBuilder extends MoveTriggerOptionBuilder implements MoveTriggerOptionProgress {
  'roll_type': RollType.Progress
  using!: Array<ProgressTypeStarforged | ProgressTypeClassic>
  constructor (yaml: YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    super(yaml, parent, index)
  }
}
