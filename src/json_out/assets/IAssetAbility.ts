import type { AssetAbilityId , IAlterMove , IAsset , IAssetInput , IHasId, IHasText , IMove } from "@json_out/index.js";

/**
 * Represents one of an asset's three abilities.
 */
export interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
  /**
   * New moves added by this asset ability.
   */
  Moves?: IMove[] | undefined;
  /**
   * User inputs (text, clocks, etc) associated with this asset ability.
   */
  Inputs?: IAssetInput[] | undefined;
  /**
   * Information on how this ability alters moves when enabled. Currently, it only details additional stat triggers added by the asset ability, but it may expand in the future.
   */
  "Alter Moves"?: IAlterMove[] | undefined;
  /**
   * Information on how this ability alters its parent asset when enabled.
   */
  "Alter Properties"?: Partial<IAsset> | undefined;
  /**
   * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
   */
  Enabled?: boolean | undefined;
}
