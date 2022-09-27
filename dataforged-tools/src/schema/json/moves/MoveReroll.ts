import type { HasId, HasText } from "@schema";


/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export interface MoveReroll extends HasId, Partial<HasText> {
  /**
   *
   */
  $id: string;
  /**
   * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
   * @markdown
   * @localize
   */
  Text?: string | undefined;
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
  Any = "any",
  /**
   * The player can pick and choose which challenge dice to reroll (none, one, or both).
   */
  ChallengeDice = "challenge dice",
  /**
   * The action die is rerolled.
   */
  ActionDie = "action die",
  /**
   * The player can choose **one** challenge die to reroll.
   */
  ChallengeDie = "challenge die",
  /**
   * Reroll *all* dice
   */
  All = "all"
}
