import type { IHasText } from "@json_out/meta/IHas.js";

/**
 * @public
 */
export interface IAlterMomentum {
  /**
   * Information on how the player's momentum burn is altered.
   */
  Burn?: IAlterMomentumBurn[] | undefined;
  /**
   * Information on how the player's momentum reset is altered.
   */
  Reset?: IAlterMomentumReset[] | undefined;
}
/**
 * @public
 */
export interface IAlterMomentumBurn {
  /**
   * The trigger condition for altering the PC's momentum burn.
   */
  Trigger: IHasText;
  /**
   * The effect altering the PC's momentum burn.
   */
  Effect: IHasText;
}
/**
 * @public
 */
export interface IAlterMomentumReset {
  /**
   * The trigger condition for altering the PC's momentum reset.
   */
  Trigger: IHasText;
  /**
   * The amount by which the PC's momentum reset is change.
   */
  Value: number;
}
