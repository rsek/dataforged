
import type { FragmentString, IActionRoll, IProgressRoll } from "@json_out/index.js";

/**
 * Describes a specific trigger condition of a move, and what rolls are made when it is triggered (if any).
 * @see {@link IMoveTrigger}
 */
export interface IMoveTriggerOption {
  // TODO: MoveTriggerOptionId
  $id: string;
  /**
   * Additional trigger text for this specific use of the move, if any. This is in addition to the primary trigger text of the move.
   * @example `Moves/Adventure/Face_Danger/Trigger/Options/1.Text`: "With speed, mobility, or agility"
   */
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
