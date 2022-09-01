import type { IHasId, IHasText } from "@json_out/index.js";


/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export interface IMoveReroll extends IHasId, Partial<IHasText> {
  /**
   *
   */
  $id: string;
  /**
   * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
   * @markdown
   * @localize
   */
  Text: string;
  /**
   * The dice to be rerolled.
   */
  Dice: RerollType;
}

/**
 * Enumerates which dice are to be rerolled.
 * @public
 */
export enum RerollType {
  /**
   * The player can pick and choose which dice to reroll.
   */
  Any = "Any",
  /**
   * The player can pick and choose which challenge dice to reroll.
   */
  ChallengeDice = "Challenge dice",
  /**
   * The action die is rerolled.
   */
  ActionDie = "Action die",
  /**
   * The player can choose one challenge die to reroll.
   */
  ChallengeDie = "Challenge die",
  /**
   * Reroll *all* dice
   */
  All = "All"
}
