import type { HasId, InputToggle, YamlAssetState } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class AssetStateBuilder implements InputToggle {
  $id: string
  Label: string
  Enabled: boolean
  Permanent: boolean
  'Disables asset': boolean
  Impact: boolean
  constructor (yaml: YamlAssetState, fragment: string, parent: HasId) {
    this.$id = formatId(fragment, parent.$id)
    this.Label = yaml.Label
    this.Enabled = yaml.Enabled ?? false
    this['Disables asset'] = yaml['Disables asset'] ?? false
    this.Impact = yaml.Impact ?? false
    this.Permanent = yaml.Permanent ?? false
  }
}
