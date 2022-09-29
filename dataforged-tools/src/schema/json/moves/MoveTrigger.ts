import type { MixinId, MixinText, MoveTriggerOptionAction, MoveTriggerOptionProgress } from '@schema'

/**
 * Describes the trigger conditions of the move.
 * @public
 */
export interface MoveTrigger extends MixinId, Partial<MixinText> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/trigger$
   */
  $id: string
  /**
   * A markdown string containing the primary trigger text for this move.
   *
   * Secondary triggers (for specific stats or uses of an asset ability) are described in `Options`.
   *
   * @markdown
   * @localize
   * @example "When you attempt something risky or react to an imminent threat..."
   */
  text?: string | undefined
  /**
   * Information on who can trigger this item. Used mainly by asset abilities, some of which can trigger from an Ally's move.
   *
   * If unspecified, assume `Ally` is `false` and `Player` is `true`.
   */
  by?: MoveTriggerBy | undefined
  /**
   * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
   *
   * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
   */
  options?: Array<MoveTriggerOptionAction | MoveTriggerOptionProgress> | undefined
}

/**
 * @public
 */
export interface MoveTriggerBy {
  /**
   * Whether the player character who owns this item can trigger it. Unsurprisingly, this is usually true, but there's a few exceptions: see *Starforged's* LOYALIST asset for an example.
   * @public
   */
  player: boolean
  /**
   * Whether an Ally (a player character other than the owner) can trigger this item. This is usually false, but there's several exceptions among asset abilities.
   */
  ally: boolean
}
