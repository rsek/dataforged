import type { ICustomStat } from "../common/ICustomStat.js";
import type { ProgressType } from "../common/index.js";
import type { RollableStat } from "../common/RollableStat.js";
import type { IHasId, IHasText } from "../meta/IHas.js";
import type { RollMethod, RollType } from "./RollMethod.js";
declare type MoveRollId = `${string}/Options/${number}`;
export interface IMoveTriggerOption<T extends RollType> extends IHasId<MoveRollId>, Partial<IHasText> {
    /**
     * Whether this option is an action roll or progress roll.
     */
    "Roll type": T;
    /**
     * The method used to choose the stat or track in the `Using` array.
     *
     * Any = the user can choose any of the options; if there's only one option, use this method.
     *
     * Highest = roll with the highest value in the array.
     *
     * Lowest = roll with the lowest value in the array.
     *
     * All = make one roll with *every* value in the array.
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
export interface IMoveActionRoll extends IMoveTriggerOption<RollType.Action> {
}
export interface IMoveProgressRoll extends Omit<IMoveTriggerOption<RollType.Progress>, "Custom stat"> {
}
export {};
//# sourceMappingURL=IMoveTriggerOption.d.ts.map