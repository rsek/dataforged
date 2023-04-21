import { CustomStatOptionBuilder } from '@builders'
import type { CustomStat, CustomStatOption, MoveTriggerOptionBase, YamlCustomStat } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class CustomStatBuilder implements CustomStat {
  $id: CustomStat['$id']
  label: string
  options: CustomStatOption[]
  constructor (yaml: YamlCustomStat, parentId: MoveTriggerOptionBase['$id']) {
    this.$id = formatId('Custom stat', parentId)
    this.label = yaml.label
    this.options = yaml.options?.map(option => new CustomStatOptionBuilder(option, this.$id))
  }
}
