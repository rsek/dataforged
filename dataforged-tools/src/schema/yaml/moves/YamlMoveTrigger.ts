import type { CustomStat, CustomStatOption, MeterAlias, MoveTrigger, MoveTriggerOptionAction, MoveTriggerOptionProgress, PcConditionMeterType, Replacement, Stat, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlMoveTrigger extends YamlStub<MoveTrigger, '', 'options'> {
  options?: Array<YamlMoveTriggerOptionAction | YamlMoveTriggerOptionProgress> | undefined
}

/**
 * @internal
 */
export interface YamlMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, 'method' | 'roll_type', 'custom_stat'> {
  'custom_stat'?: YamlCustomStat | undefined
  using: Array<Stat | Replacement | PcConditionMeterType | MeterAlias>
}

/**
 * @internal
 */
export interface YamlMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, 'method' | 'using' | 'roll_type'> {
}

/**
 * @internal
 */
export interface YamlCustomStat extends YamlStub<CustomStat, '', 'options'> {
  options: YamlCustomStatOption[]
}

/**
 * @internal
 */
export interface YamlCustomStatOption extends YamlStub<CustomStatOption> { }
