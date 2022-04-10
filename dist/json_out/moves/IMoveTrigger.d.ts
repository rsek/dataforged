import type { FragmentString, IMoveTriggerOption } from "../index.js";
/**
 * Describes the trigger conditions of the move.
 */
export interface IMoveTrigger {
    /**
     * @example `Moves/Adventure/Face_Danger/Trigger`
     */
    $id: string;
    /**
     * The primary trigger text for this move.
     * @example `Moves/Adventure/Face_Danger/Trigger.Text`: "When you attempt something risky or react to an imminent threat..."
     */
    Text: FragmentString;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    Options?: IMoveTriggerOption[] | undefined;
}
//# sourceMappingURL=IMoveTrigger.d.ts.map