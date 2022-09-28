import type { AlterMove, AlterMoveOutcomes, AssetAttachment, MoveTriggerOptionAction, MoveTriggerOptionProgress, YamlAsset, YamlAssetAbility, YamlConditionMeter, YamlMoveTrigger, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeWeakHit, YamlStub } from '@schema'
import type { PartialBy, PartialDeep } from '@utils'

/**
 * @internal
 */
export interface YamlAlterAsset extends PartialDeep<Omit<YamlAsset, 'Abilities' | 'Inputs' | 'Condition meter' | 'Requirement' | 'Attachments'>> {
  Abilities?: YamlAlterAssetAbility[] | undefined
  'Condition meter'?: YamlAlterAssetConditionMeter | undefined
  Attachments?: YamlAssetAssetAttachments | undefined
}

/**
 * @internal
 */
export interface YamlAssetAssetAttachments extends Partial<AssetAttachment> { }

/**
 * @internal
 */
export interface YamlAlterAssetConditionMeter extends Partial<YamlConditionMeter> { }

/**
 * @internal
 */
export interface YamlAlterAssetAbility extends Partial<Omit<YamlAssetAbility, 'Moves' | 'Inputs' | 'Alter'>> { }

/**
 * @internal
 */
export interface YamlAlterMove extends YamlStub<AlterMove, '', 'Trigger' | 'Outcomes'> {
  Trigger?: YamlAlterMoveTrigger | undefined
  Outcomes?: YamlAlterMoveOutcomes | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomes extends YamlStub<AlterMoveOutcomes, '', 'Strong hit' | 'Weak hit' | 'Miss'> {
  'Strong hit': YamlAlterMoveOutcomeStrongHit | undefined
  'Weak hit': YamlAlterMoveOutcomeWeakHit | undefined
  'Miss': YamlAlterMoveOutcomeMiss | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeStrongHit extends PartialBy<YamlOutcomeStrongHit, 'Text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeWeakHit extends PartialBy<YamlOutcomeWeakHit, 'Text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeMiss extends PartialBy<YamlOutcomeMiss, 'Text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveTrigger extends YamlStub<YamlMoveTrigger, '', 'Options'> {
  Options?: Array<YamlAlterMoveTriggerOptionAction | YamlAlterMoveTriggerOptionProgress> | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, 'Method', 'Using'> {
  Using?: MoveTriggerOptionAction['Using'] | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, 'Method', 'Using'> {
  Using?: MoveTriggerOptionProgress['Using'] | undefined
}
