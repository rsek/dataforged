import { AlterAsset, AlterMomentum, AlterMove } from '@schema';

/**
 * Describes how an asset ability alters other game elements.
 * @public
 */
export interface Alter {
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
