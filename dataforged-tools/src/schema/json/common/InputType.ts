/**
 * @public
 */
export enum InputType {
  /**
   * A string input, similar to `<input type="text">`;
   * @see {@link InputText}
   */
  Text = "text",
  /**
   * An input where one option is selected from a list, similar to `<select>`.
   * @see {@link InputSelect}
   */
  Select = "select",
  /**
   * An input with an integer value, similar to `<input type="number">`;
   * @see {@link InputNumber}
   */
  Number = "number",
  /**
   * An input representing a *Starforged*-style clock.
   * @see {@link InputClock}
   */
  Clock = "clock",
  /**
   * An input representing an option with an an "on" and "off" state, similar to `<input type="checkbox">`.
   * @see {@link InputToggle}
   */
  Toggle = "toggle"
}

