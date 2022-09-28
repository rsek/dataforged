import { CustomStatOptionBuilder } from '@builders'
import type { CustomStat, CustomStatOption, MoveTriggerOptionBase, YamlCustomStat } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class CustomStatBuilder implements CustomStat {
  $id: CustomStat['$id']
  Label: string
  Options: CustomStatOption[]
  constructor (yaml: YamlCustomStat, parentId: MoveTriggerOptionBase['$id']) {
    this.$id = formatId('Custom stat', parentId)
    this.Label = yaml.Label
    this.Options = yaml.Options?.map(option => new CustomStatOptionBuilder(option, this.$id))
  }
}
