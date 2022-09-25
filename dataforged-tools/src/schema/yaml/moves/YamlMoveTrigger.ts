import type { CustomStat , CustomStatOption, MeterAlias, MoveTrigger, MoveTriggerOptionAction, MoveTriggerOptionProgress, PlayerConditionMeter, Replacement, Stat, YamlStub } from "@schema";

/**
 * @internal
 */
export interface YamlMoveTrigger extends YamlStub<MoveTrigger, "", "Options">{
  Options?: (YamlMoveTriggerOptionAction|YamlMoveTriggerOptionProgress)[] | undefined;
}


/**
 * @internal
 */
export interface YamlMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, "Method"|"Roll type", "Custom stat"> {
  "Custom stat"?: YamlCustomStat | undefined;
  Using: (Stat|Replacement|PlayerConditionMeter|MeterAlias)[]
}

/**
 * @internal
 */
export interface YamlMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, "Method"|"Using"|"Roll type">{}

/**
 * @internal
 */
export interface YamlCustomStat extends YamlStub<CustomStat, "", "Options"> {
  Options: YamlCustomStatOption[];
}

/**
 * @internal
 */
export interface YamlCustomStatOption extends YamlStub<CustomStatOption> {}