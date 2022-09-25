import type { CustomStat, HasId, HasText, ProgressTypeIronsworn, ProgressTypeStarforged, RollableStat, RollMethod, RollType } from "@schema";

/**
 * @public
 */
export interface MoveTriggerOptionBase extends HasId, Partial<HasText> {
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
  "Custom stat"?: CustomStat | undefined;
}

/**
 * @public
 */
export interface MoveTriggerOptionAction extends MoveTriggerOptionBase {
  "Roll type": RollType.Action;
  Using: RollableStat[];
}

/**
 * @public
 */
export interface MoveTriggerOptionProgress extends MoveTriggerOptionBase {
  "Roll type": RollType.Progress;
  Using: (ProgressTypeStarforged|ProgressTypeIronsworn)[];
}