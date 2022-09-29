import type { MixinId, Title, YamlTitle } from '@schema'
import { formatId } from '@utils/formatId.js'

/**
 * @internal
 */
export class TitleBuilder implements Title {
  $id: string
  canonical: string
  standard: string
  short: string
  constructor (yaml: YamlTitle, parent: MixinId) {
    if (!yaml ?? !yaml.canonical) {
      throw new Error(`Missing canonical title for ${parent.$id}:\n${JSON.stringify(parent)}`)
    }
    this.$id = formatId('Title', parent.$id)
    this.canonical = yaml.canonical
    this.standard = yaml.standard ?? yaml.canonical
    this.short = yaml.short ?? yaml.standard ?? this.canonical
  }
}
