import { InputSelectBuilder, InputToggleBuilder } from '@builders'
import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { Asset, AssetAbility, ClockSegments, Input, InputClock, InputNumber, InputText, YamlInput, YamlInputClock, YamlInputNumber, YamlInputSelect, YamlInputText, YamlInputToggle } from '@schema'
import { ClockType, InputType } from '@schema'
import type { InputDisplay } from '@schema/json/common/InputDisplay.js'

/**
 * @internal
 */
// @ts-expect-error
export abstract class InputBuilder extends NodeBuilder<YamlInput, Input, AssetAbility | Asset> implements Input {
  label: string
  input_type: InputType
  display!: InputDisplay
  abstract permanent: boolean
  constructor (yaml: YamlInput, key: string, parent: AssetAbility | Asset) {
    // @ts-expect-error
    super(yaml, 'inputs/' + key, parent)
    this.label = yaml.label
    this.input_type = yaml.input_type
  }

  static pickTypedInput<T extends InputType>(yaml: YamlInput & { input_type: T }, key: string, parent: AssetAbility | Asset): InputClockBuilder | InputNumberBuilder | InputSelectBuilder | InputTextBuilder | InputToggleBuilder {
    switch (yaml.input_type) {
      case InputType.Clock: {
        return new InputClockBuilder(yaml as unknown as YamlInputClock, key, parent)
      }
      case InputType.Number: {
        return new InputNumberBuilder(yaml as unknown as YamlInputNumber, key, parent)
      }
      case InputType.Select: {
        return new InputSelectBuilder(yaml as unknown as YamlInputSelect, key, parent)
      }
      case InputType.Text: {
        return new InputTextBuilder(yaml as YamlInputText, key, parent)
      }
      case InputType.Toggle: {
        return new InputToggleBuilder(yaml as unknown as YamlInputToggle, key, parent)
      }
      default: {
        throw new Error("Unable to assign input data to a type - make sure it's correct.")
      }
    }
  }
}

/**
 * @internal
 */
export class InputNumberBuilder extends InputBuilder implements InputNumber {
  display!: InputDisplay
  readonly input_type = InputType.Number
  min: number
  max: number | null
  readonly step = 1
  value: number
  readonly permanent = false
  constructor (yaml: YamlInputNumber, key: string, parent: AssetAbility | Asset) {
    super(yaml, key, parent)
    this.min = yaml.min ?? 0
    this.max = yaml.max ?? null
    this.value = yaml.value ?? 0
  }
}

/**
 * @internal
 */
export class InputClockBuilder extends InputBuilder implements InputClock {
  readonly clock_type: ClockType = ClockType.Tension
  display!: InputDisplay
  segments: ClockSegments
  readonly input_type = InputType.Clock
  readonly filled = 0
  readonly permanent = false
  constructor (yaml: YamlInputClock, key: string, parent: AssetAbility | Asset) {
    super(yaml, key, parent)
    this.segments = yaml.segments
    // TODO: validate number range - maybe with decorators?
  }
}

/**
 * @internal
 */
export class InputTextBuilder extends InputBuilder implements InputText {
  readonly input_type = InputType.Text
  display!: InputDisplay
  readonly permanent = true
  constructor (yaml: YamlInputText, key: string, parent: AssetAbility | Asset) {
    super(yaml, key, parent)
  }
}
