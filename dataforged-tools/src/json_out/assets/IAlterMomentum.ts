import type { IHasId, IHasText } from "@json_out/index.js";

/**
 * @public
 */
export interface IAlterMomentum extends IHasId {
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
export interface IAlterMomentumBurn extends IHasId {
  /**
   * The trigger condition for altering the PC's momentum burn.
   */
  Trigger: IHasText;
  /**
   * The effect altering the PC's momentum burn.
   */
  Effect: IHasText;
  Outcomes?: ("Strong Hit" | "Weak Hit")[] | undefined;
}
/**
 * @public
 */
export interface IAlterMomentumReset extends IHasId {
  /**
   * The trigger condition for altering the PC's momentum reset.
   */
  Trigger: IHasText;
  /**
   * The amount by which the PC's momentum reset is change.
   */
  Value: number;
}
