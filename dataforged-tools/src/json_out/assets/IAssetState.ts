//License: MIT
import type { IHasName } from "@json_out/index.js";

/**
 * Describes a possible state for an asset, like the "Broken" status for certain assets (mainly Modules in *Starforged*).
 *
 * States are frequently toggled on and off by players; for real-world gameplay, this is generally represented by flipping the card over. A checkbox or other on/off toggle might serve the same function in a digital implementation.
 * @public
 */
export interface IAssetState extends IHasName {
  /**
   * A string label name or label for the state.
   * @example "Broken"
   */
  Name: string;
  /**
   * Whether this state is currently enabled.
   */
  Enabled: boolean;
  /**
   * Whether this state should disable the entire asset when `IAssetState.Enabled === true`
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
