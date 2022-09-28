import type { AlterAsset, AlterMomentum, AlterMove, HasId, HasLabel, HasText, InputClock, InputNumber, InputSelect, InputText, Move } from "@schema";

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export interface AssetAbility extends HasId, HasText, Partial<HasLabel> {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/[1-3]$
   */
  $id: string;
  /**
   * Ironsworn companion assets provide labels for their abilities. Starforged asset abilities do not have labels.
   */
  Label?: string | undefined;
  /**
   * New moves added by this asset ability.
   */
  Moves?: Move[] | undefined;
  /**
   * User inputs (text, clocks, etc) associated with this asset ability.
   * @patternProperties ^[A-Z].+$
   */
  Inputs?: {[key:string]:(InputNumber|InputClock|InputText|InputSelect)} | undefined;

  /**
   * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
   */
  Enabled: boolean;
}
/**
 * Describes how an asset ability alters other game elements.
 * @public
 */
export interface AssetAbilityAlter {
/**
   * Information on how this ability alters moves when enabled.
   */
  Moves?: AlterMove[] | undefined;
  /**
   * Information on how this ability alters its parent asset when enabled.
   */
  Properties?: AlterAsset | undefined;
  /**
   * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
   */
  Momentum?: AlterMomentum | undefined;
}