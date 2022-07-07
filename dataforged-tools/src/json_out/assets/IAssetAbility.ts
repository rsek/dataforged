import type { IAlterMomentum , IAlterMove , IAssetAlterProperties, IHasId, IHasText, IInputClock, IInputNumber, IInputText, IMove } from "@json_out/index.js";

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export interface IAssetAbility extends IHasId, IHasText {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]$
   */
  $id: string;
  /**
   * Ironsworn companion assets provide names for their abilities. Starforged asset abilities do not have names.
   */
  Name?: string | undefined;
  /**
   * New moves added by this asset ability.
   */
  Moves?: IMove[] | undefined;
  /**
   * User inputs (text, clocks, etc) associated with this asset ability.
   */
  Inputs?: (IInputNumber|IInputClock|IInputText)[] | undefined;
  /**
   * Information on how this ability alters moves when enabled.
   */
  "Alter Moves"?: IAlterMove[] | undefined;
  /**
   * Information on how this ability alters its parent asset when enabled.
   */
  "Alter Properties"?: IAssetAlterProperties | undefined;
  /**
   * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
   */
  "Alter Momentum"?: IAlterMomentum | undefined;
  /**
   * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
   */
  Enabled: boolean;
}

