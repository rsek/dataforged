import { MixinId, InputToggle, YamlInputToggle, InputDisplay, InputDisplayPosition, InputType } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class InputToggleBuilder implements InputToggle {
  $id: string
  readonly input_type = InputType.Toggle
  label: string
  text: string
  display: InputDisplay
  enabled: boolean
  permanent: boolean
  disables_asset: boolean
  is_impact: boolean
  constructor(yaml: YamlInputToggle, fragment: string, parent: MixinId) {
    this.$id = formatId(fragment, parent.$id)
    this.label = yaml.label
    this.enabled = yaml.enabled ?? false
    this.disables_asset = yaml.disables_asset ?? false
    this.is_impact = yaml.is_impact ?? false
    this.permanent = yaml.permanent ?? false
    this.text = yaml.text
    this.display = yaml.display ?? { position: InputDisplayPosition.ConditionMeter }
  }
}
