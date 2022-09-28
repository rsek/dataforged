import type { CustomStatOption } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class CustomStatOptionBuilder implements CustomStatOption {
  $id: CustomStatOption['$id']
  Label: string
  Value: number
  constructor (yaml: Omit<CustomStatOption, '$id'>, parentId: CustomStatOption['$id']) {
    this.$id = formatId(yaml.Label, parentId)
    this.Label = yaml.Label
    this.Value = yaml.Value
  }
}
