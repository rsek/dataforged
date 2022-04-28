import type { MoveId } from "../index.js";
import type { IHasId, IHasText } from "../meta/IHas.js";
import type { IMoveTriggerOption } from "./IMoveTriggerOption.js";
import type { RollType } from "./RollMethod.js";
/**
 * @public
 */
export declare type MoveTriggerId = `${MoveId}/Trigger`;
/**
 * Describes the trigger conditions of the move.
 * @public
 */
export interface IMoveTrigger extends IHasId<MoveTriggerId>, Partial<IHasText> {
    /**
     * @example `Starforged/Moves/Adventure/Face_Danger/Trigger`
     */
    $id: MoveTriggerId;
    /**
     * A markdown string containing the primary trigger text for this move.
     * @example `Starforged/Moves/Adventure/Face_Danger/Trigger.Text`: "When you attempt something risky or react to an imminent threat..."
     */
    Text?: string | undefined;
    /**
     * Information on who can trigger this item. Used mainly by asset abilities, some of which can trigger from an Ally's move.
     *
     * If unspecified, assume `Ally` is `false` and `Player` is `true`.
     */
    By?: IMoveTriggerBy | undefined;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    "Options"?: IMoveTriggerOption<RollType>[] | undefined;
}
/**
 * @public
 */
export interface IMoveTriggerBy {
    /**
     * Whether the player character who owns this item can trigger it. Unsurprisingly, this is usually true, but there's a few exceptions: see *Starforged's* LOYALIST asset for an example.
     * @public
     */
    Player: boolean;
    /**
     * Whether an Ally (a player character other than the owner) can trigger this item. This is usually false, but there's several exceptions among asset abilities.
     */
    Ally: boolean;
}
//# sourceMappingURL=IMoveTrigger.d.ts.map