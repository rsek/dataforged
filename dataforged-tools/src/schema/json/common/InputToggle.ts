import type { MixinText, Input, InputType } from '@schema'

/**
 * Describes a state that can be toggled "on" and "off".
 *
 * @example "broken" and "battered" used by vehicles in *Starforged*.
 * @example "out of action" used by companions in *Starforged*.
 * @see {@link InputType.Number}
 * @public
 */
export interface InputToggle extends Input, MixinText {
  input_type: InputType.Toggle
  /**
   * Whether this state is currently active.
   */
  enabled: boolean
  /**
   * Whether this state should disable the entire asset when {@link InputToggle.enabled} is set to `true`.
   */
  disables_asset: boolean
  /**
   * Whether this state counts as a Debility (*Ironsworn*) or Impact (*Starforged*) for the asset's owner when {@link InputToggle.enabled} is set to `true`.
   *
   * Note that for vehicles, this shouldn't be applied automatically unless your implementation has some way of telling which vehicle the PC is currently using.
   */
  is_impact: boolean
  /**
   * Rules text that applies when {@link InputToggle.enabled} is set to `true`.
   * @markdown
   * @localize
   */
  text: string
}
