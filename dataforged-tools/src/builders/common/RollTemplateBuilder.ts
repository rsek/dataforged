import type { MixinId, RollTemplate, YamlRollTemplate } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class RollTemplateBuilder implements RollTemplate {
  $id: string
  result?: string | undefined
  summary?: string | undefined
  description?: string | undefined
  constructor (yaml: YamlRollTemplate, parent: MixinId) {
    this.$id = formatId('roll template', parent.$id)
    this.result = yaml.result
    this.summary = yaml.summary
    this.description = yaml.description
  }
}
