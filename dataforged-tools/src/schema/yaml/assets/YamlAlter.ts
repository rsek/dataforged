import type { AlterMove, AlterMoveOutcomes, AssetAttachment, MoveTriggerOptionAction, MoveTriggerOptionProgress, YamlAsset, YamlAssetAbility, YamlConditionMeter, YamlMoveTrigger, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeWeakHit, YamlStub } from '@schema'
import type { PartialBy, PartialDeep } from '@utils'

/**
 * @internal
 */
export interface YamlAlterAsset extends PartialDeep<Omit<YamlAsset, 'abilities' | 'inputs' | 'condition_meter' | 'requirement' | 'attachments'>> {
  abilities?: YamlAlterAssetAbility[] | undefined
  'condition_meter'?: YamlAlterAssetConditionMeter | undefined
  attachments?: YamlAssetAssetAttachments | undefined
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
export interface YamlAlterAssetAbility extends Partial<Omit<YamlAssetAbility, 'moves' | 'inputs' | 'alter'>> { }

/**
 * @internal
 */
export interface YamlAlterMove extends YamlStub<AlterMove, '', 'trigger' | 'outcomes'> {
  trigger?: YamlAlterMoveTrigger | undefined
  outcomes?: YamlAlterMoveOutcomes | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomes extends YamlStub<AlterMoveOutcomes, '', 'strong_hit' | 'weak_hit' | 'miss'> {
  'strong_hit': YamlAlterMoveOutcomeStrongHit | undefined
  'weak_hit': YamlAlterMoveOutcomeWeakHit | undefined
  'miss': YamlAlterMoveOutcomeMiss | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeStrongHit extends PartialBy<YamlOutcomeStrongHit, 'text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeWeakHit extends PartialBy<YamlOutcomeWeakHit, 'text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeMiss extends PartialBy<YamlOutcomeMiss, 'text'> { }

/**
 * @internal
 */
export interface YamlAlterMoveTrigger extends YamlStub<YamlMoveTrigger, '', 'options'> {
  options?: Array<YamlAlterMoveTriggerOptionAction | YamlAlterMoveTriggerOptionProgress> | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, 'method', 'using'> {
  using?: MoveTriggerOptionAction['using'] | undefined
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, 'method', 'using'> {
  using?: MoveTriggerOptionProgress['using'] | undefined
}
