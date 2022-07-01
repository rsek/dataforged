//License: MIT
import type { ProgressTypeIronsworn } from "@json_out/common/ProgressType.js";
import type { ICustomStat , IHasId , IHasText , ProgressTypeStarforged, RollableStat , RollMethod, RollType } from "@json_out/index.js";

/**
 * @public
 */
export interface IMoveTriggerOptionBase extends IHasId, Partial<IHasText> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Trigger/Options/[0-9]+$
   */
  $id: string;
  /**
   * Whether this option is an action roll or progress roll.
   */
  "Roll type": RollType;
  /**
   * The method used to choose the stat or track in the `Using` array.
   */
  Method: RollMethod;
  /**
   * The stat(s) or progress track(s) that may be rolled with this move trigger option.
   */
  Using: (RollableStat | ProgressTypeStarforged|ProgressTypeIronsworn)[];
  /**
   * Defines a custom stat, if one is included in this object's `With` array.
   */
  "Custom stat"?: ICustomStat | undefined;
}

/**
 * @public
 */
export interface IMoveTriggerOptionAction extends IMoveTriggerOptionBase {
  "Roll type": RollType.Action;
  Using: RollableStat[];
}

/**
 * @public
 */
export interface IMoveTriggerOptionProgress extends IMoveTriggerOptionBase {
  "Roll type": RollType.Progress;
  Using: (ProgressTypeStarforged|ProgressTypeIronsworn)[];
}