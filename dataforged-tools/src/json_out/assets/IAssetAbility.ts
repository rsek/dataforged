
import type { IAlterMomentum } from "@json_out/assets/IAlterMomentum";
import type { IAssetAlterProperties } from "@json_out/assets/IAssetAlterProperties.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetIdBase, IAlterMove, IHasId, IHasText, IInput, IMove, InputType } from "@json_out/index.js";

/**
 * @public
 */
export type AssetAbilityId = `${Gamespace}/${AssetAbilityIdBase}`;

/**
 * @public
 */
export type AssetAbilityIdBase = `${AssetIdBase}/Abilities/${number}`;

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
  /**
   * New moves added by this asset ability.
   */
  Moves?: IMove[] | undefined;
  /**
   * User inputs (text, clocks, etc) associated with this asset ability.
   */
  Inputs?: IInput<InputType>[] | undefined;
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

