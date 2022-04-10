enum InputType {
  /**
   * A text input.
   * Suggested rendering: a single-line text input.
   */
  Text = "Text",
  /**
   * An input where the user selects from a list of pre-set options.
   * Suggested rendering: a drop-down selection menu.
   */
  Select = "Select",
  /**
   * An input where the user sets an integer.
   * Suggested rendering: a number input spinner.
   */
  Number = "Number",
  /**
   * An input representing an *Ironsworn: Starforged* clock.
   * @seePage 239
   */
  Clock = "Clock"
}

export { InputType };

