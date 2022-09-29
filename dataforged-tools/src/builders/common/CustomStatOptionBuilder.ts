import type { CustomStatOption } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class CustomStatOptionBuilder implements CustomStatOption {
  $id: CustomStatOption['$id']
  label: string
  value: number
  constructor (yaml: Omit<CustomStatOption, '$id'>, parentId: CustomStatOption['$id']) {
    this.$id = formatId(yaml.label, parentId)
    this.label = yaml.label
    this.value = yaml.value
  }
}
