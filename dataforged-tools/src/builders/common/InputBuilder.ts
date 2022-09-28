import { ClockType } from '@schema'
import { Asset, AssetAbility, ClockSegments, Input, InputClock, InputNumber, InputText, InputType, YamlInput, YamlInputClock, YamlInputNumber, YamlInputText } from '@schema'
import { formatId } from '@utils'
import { InputDisplay } from "@schema/json/common/InputDisplay.js"

/**
 * @internal
 */
export abstract class InputBuilder implements Input {
  $id: string
  Label: string
  "Input type": InputType
  Display!: InputDisplay
  abstract Permanent: boolean
  constructor(yaml: YamlInput, parent: AssetAbility | Asset) {
    this.$id = formatId(yaml._idFragment ?? yaml.Label, parent.$id, 'Inputs')
    this.Label = yaml.Label
    this["Input type"] = yaml["Input type"]
  }
}

/**
 * @internal
 */
export class InputNumberBuilder extends InputBuilder implements InputNumber {
  Display: InputDisplay
  readonly "Input type" = InputType.Number
  Min: number
  Max: number | null
  readonly Step = 1
  Value: number
  readonly Permanent = false
  constructor(yaml: YamlInputNumber & { 'Input type': InputType.Number }, parent: AssetAbility | Asset) {
    super(yaml, parent)
    this.Min = yaml.Min ?? 0
    this.Max = yaml.Max ?? null
    this.Value = yaml.Value ?? 0
    this.Permanent = yaml.Permanent ?? true
  }
}

/**
 * @internal
 */
export class InputClockBuilder extends InputBuilder implements InputClock {
  'Clock type': ClockType = ClockType.Tension
  Display: InputDisplay
  Segments: ClockSegments
  readonly "Input type" = InputType.Clock
  readonly Filled = 0;
  readonly Permanent = false
  constructor(yaml: YamlInputClock, parent: AssetAbility | Asset) {
    super(yaml, parent)
    this.Segments = yaml.Segments
    // TODO: validate number range - maybe with decorators?
    this.Permanent = yaml.Permanent ?? true
  }
}

/**
 * @internal
 */
export class InputTextBuilder extends InputBuilder implements InputText {
  readonly "Input type" = InputType.Text
  Display: InputDisplay
  readonly Permanent = true
  constructor(yaml: YamlInputText, parent: AssetAbility | Asset) {
    super(yaml, parent)
  }
}
