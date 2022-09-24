import type { HasLabel } from "@schema_json";

/**
 * Describes a possible state for an asset, like the "broken" status for certain assets (mainly Modules in *Starforged*).
 *
 * States are frequently toggled on and off by players; for real-world gameplay, this is generally represented by flipping the card over. A checkbox or other on/off toggle might serve the same function in a digital implementation.
 * @public
 */
export interface AssetState extends HasLabel {
  /**
   * A string label for the state.
   * @example "broken"
   * @localize
   * @pattern ^[a-z].+$
   */
  Label: string;
  /**
   * Whether this state is currently enabled.
   */
  Enabled: boolean;
  /**
   * Whether this state should disable the entire asset when `AssetState.Enabled === true`
   */
  "Disables asset": boolean;
  /**
   * Whether this state counts as an Impact for the asset's owner.
   *
   * Note that for vehicles, this shouldn't be applied automatically unless your implementation has some way of telling which vehicle the PC is currently using.
   */
  "Impact": boolean;
  /**
   * Whether or not this state is permanent.
   */
  Permanent: boolean;
  /**
   * Information on how this state is displayed.
   */
  // Display: {"Show on meter": boolean};
  // TODO: figure out if & how this could be integrated with impact info
}
