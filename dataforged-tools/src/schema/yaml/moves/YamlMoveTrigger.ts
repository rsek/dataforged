import type { CustomStat, CustomStatOption, MeterAlias, MoveTrigger, MoveTriggerOptionAction, MoveTriggerOptionProgress, PcConditionMeterType, Replacement, Stat, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlMoveTrigger extends YamlStub<MoveTrigger, '', 'Options'> {
  Options?: Array<YamlMoveTriggerOptionAction | YamlMoveTriggerOptionProgress> | undefined
}

/**
 * @internal
 */
export interface YamlMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, 'Method' | 'Roll type', 'Custom stat'> {
  'Custom stat'?: YamlCustomStat | undefined
  Using: Array<Stat | Replacement | PcConditionMeterType | MeterAlias>
}

/**
 * @internal
 */
export interface YamlMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, 'Method' | 'Using' | 'Roll type'> { }

/**
 * @internal
 */
export interface YamlCustomStat extends YamlStub<CustomStat, '', 'Options'> {
  Options: YamlCustomStatOption[]
}

/**
 * @internal
 */
export interface YamlCustomStatOption extends YamlStub<CustomStatOption> { }
