import type {
  CustomStat, HasId, HasText, ProgressTypeClassic, ProgressTypeStarforged, RollMethod, RollType, Stat, PcConditionMeterType, ConditionMeter, LegacyTypeStarforged,
  LegacyTypeClassic
} from '@schema'

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export type RollableStat = Stat | CustomStat['$id'] | PcConditionMeterType | ConditionMeter['$id']

/**
 * @public
 */
export interface MoveTriggerOptionBase extends HasId, Partial<HasText> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/trigger/options/[0-9]+$
   */
  $id: string
  /**
   * Whether this option is an action roll or progress roll.
   */
  'Roll type': RollType
  /**
   * The method used to choose the stat or track in the `Using` array.
   */
  Method: RollMethod
  /**
   * The stat(s) or progress track(s) that may be rolled with this move trigger option.
   */
  Using: Array<RollableStat | ProgressTypeStarforged | ProgressTypeClassic | LegacyTypeStarforged | LegacyTypeClassic>
  /**
   * Defines a custom stat, if one is included in this object's `With` array.
   */
  'Custom stat'?: CustomStat | undefined
}

/**
 * @public
 */
export interface MoveTriggerOptionAction extends MoveTriggerOptionBase {
  'Roll type': RollType.Action
  Using: RollableStat[]
}

/**
 * @public
 */
export interface MoveTriggerOptionProgress extends MoveTriggerOptionBase {
  'Roll type': RollType.Progress
  Using: Array<ProgressTypeStarforged | ProgressTypeClassic>
}
