import type { Clock, ClockSegments, ClockType, MixinDisplay, MixinLabel } from '@schema'
import type { InputDisplay } from '@schema/json/common/InputDisplay.js'

/**
 * @public
 */
export enum InputType {
  /**
   * A string input, similar to `<input type="text">`;
   * @see {@link InputText}
   */
  Text = 'text',
  /**
   * An input where one option is selected from a list, similar to `<select>`.
   * @see {@link InputSelect}
   */
  Select = 'select',
  /**
   * An input with an integer value, similar to `<input type="number">`;
   * @see {@link InputNumber}
   */
  Number = 'number',
  /**
   * An input representing a *Starforged*-style clock.
   * @see {@link InputClock}
   */
  Clock = 'clock',
  /**
   * An input representing an option with an an "on" and "off" state, similar to `<input type="checkbox">`.
   * @see {@link InputToggle}
   */
  Toggle = 'toggle'
}

/**
 * A stub interface representing an input widget of any type.
 * @see {@link InputNumber}, {@link InputClock}, {@link InputText}, {@link InputSelect}, {@link InputToggle}
 * @public
 */
export interface Input extends MixinLabel, MixinDisplay {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/([1-3]/)?inputs/[a-z_-]+$
   */
  $id: string
  label: string
  /**
   * The type of input represented by this object.
   */
  input_type: InputType
  /**
   * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
   *
   * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
   */
  permanent: boolean
  display: InputDisplay
}

/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner, similar to `<input type='number'>` in HTML.
 * @see {@link InputType.Number}
 * @public
 */
export interface InputNumber extends Input {
  input_type: InputType.Number
  min: number
  /**
   * The maximum value for this number input. If it's "null", it has no maximum.
   * @nullable
   */
  max: number | null
  step: 1
  value: number
  permanent: false
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @page 239
 * @see {@link InputType.Clock}
 * @public
 */
export interface InputClock extends Input, Clock {
  input_type: InputType.Clock
  /**
   * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
   */
  clock_type: ClockType
  /**
   * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
   *
   * `Filled` should not exceed this number.
   */
  segments: ClockSegments
  /**
   * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
   */
  filled: number
  permanent: false
}
/**
 * A text input.
 *
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export interface InputText extends Input {
  input_type: InputType.Text
  permanent: true
}
