import type { ICustomStat } from "../common/ICustomStat.js";
import type { ProgressType } from "../common/index.js";
import type { RollableStat } from "../common/RollableStat.js";
import type { IHasId, IHasText } from "../meta/IHas.js";
import type { MoveTriggerId } from "./IMoveTrigger.js";
import type { RollMethod, RollType } from "./RollMethod.js";
/**
 * @internal
 * @asType string
 */
export declare type MoveTriggerOptionId = `${MoveTriggerId}/Options/${number}`;
/**
 * @public
 */
export interface IMoveTriggerOption<T extends RollType> extends IHasId, Partial<IHasText> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Trigger/Options/[0-9]+$
     */
    $id: string;
    /**
     * Whether this option is an action roll or progress roll.
     */
    "Roll type": T;
    /**
     * The method used to choose the stat or track in the `Using` array.
     */
    Method: RollMethod;
    /**
     * The stat(s) or progress track(s) that may be rolled with this move trigger option.
     */
    Using: T extends RollType.Action ? RollableStat[] : T extends RollType.Progress ? ProgressType[] : (RollableStat[] | ProgressType[]);
    /**
     * Defines a custom stat, if one is included in this object's `With` array.
     */
    "Custom stat"?: ICustomStat | undefined;
}
/**
 * @public
 */
export interface IMoveActionRoll extends IMoveTriggerOption<RollType.Action> {
}
/**
 * @public
 */
export interface IMoveProgressRoll extends Omit<IMoveTriggerOption<RollType.Progress>, "Custom stat"> {
}
//# sourceMappingURL=IMoveTriggerOption.d.ts.map