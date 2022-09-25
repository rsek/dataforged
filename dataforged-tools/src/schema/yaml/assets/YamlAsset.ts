
import type { AlterMove, AlterMoveOutcomes, Asset, AssetAbility, AssetAttachment, AssetState, AssetType, ConditionMeter , Input, InputClock, InputNumber, InputSelect, InputSelectOption, InputSelectOptionSetter, InputText, MoveTriggerOptionAction, MoveTriggerOptionProgress, YamlAlterMomentum, YamlMove, YamlMoveTrigger, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeWeakHit, YamlStub, YamlStubNode } from "@schema";
import type { PartialBy, PartialDeep } from "@utils";
import type { StubExcept } from "@utils/types/Stub.js";

/**
 * @internal
 */
export interface YamlAssetType extends YamlStubNode<AssetType, "", "Assets"> {
  Assets: {[key: string]: YamlAsset};
 }

/**
 * @internal
 */
export interface YamlAsset extends YamlStubNode<StubExcept<Asset,"","Abilities"|"Inputs"|"Condition Meter"|"States">> {
  Abilities: [YamlAssetAbility,YamlAssetAbility,YamlAssetAbility];
  Inputs?: (YamlInputText|YamlInputSelect)[]| undefined;
  "Condition Meter"?: YamlConditionMeter | undefined;
  States?: YamlAssetState[] | undefined;
}


/**
 * @internal
 */
export interface YamlAssetAbility extends YamlStub<AssetAbility, "Enabled", "Alter Moves"|"Moves"|"Inputs"|"Alter Momentum"|"Alter Properties"> {
  "Alter Moves"?: YamlAlterMove[] | undefined;
  Moves?: YamlMove[]|undefined;
  Inputs?: (YamlInputText|YamlInputClock|YamlInputNumber)[] | undefined;
  "Alter Momentum"?: YamlAlterMomentum | undefined
  "Alter Properties"?: YamlAssetAlterProperties | undefined
}

/**
 * @internal
 */
export interface YamlAssetAlterProperties extends PartialDeep<Omit<YamlAsset, "Abilities"|"Inputs"|"Condition Meter"|"Requirement"|"Attachments">> {
  Abilities?: YamlAssetAlterPropertiesAbility[] | undefined;
  "Condition Meter"?: YamlAssetAlterPropertiesConditionMeter | undefined
  Attachments?: YamlAssetAlterPropertiesAttachments | undefined
}

/**
 * @internal
 */
export interface YamlAssetAlterPropertiesAttachments extends Partial<AssetAttachment> {}

/**
 * @internal
 */
export interface YamlAssetAlterPropertiesConditionMeter extends Partial<YamlConditionMeter> {}

/**
 * @internal
 */
export interface YamlAssetAlterPropertiesAbility extends Partial<Omit<YamlAssetAbility,"Alter Properties"|"Moves"|"Inputs"|"Alter Moves"|"Alter Momentum">> { }

/**
 * @internal
 */
export interface YamlAlterMove extends YamlStub<AlterMove, "", "Trigger"|"Outcomes"> {
  Trigger?: YamlAlterMoveTrigger | undefined;
  Outcomes?: YamlAlterMoveOutcomes | undefined;
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomes extends YamlStub<AlterMoveOutcomes, "", "Strong Hit"|"Weak Hit"|"Miss"> {
  "Strong Hit": YamlAlterMoveOutcomeStrongHit| undefined;
  "Weak Hit": YamlAlterMoveOutcomeWeakHit | undefined;
  "Miss": YamlAlterMoveOutcomeMiss | undefined;
}

/**
 * @internal
 */
export interface YamlAlterMoveOutcomeStrongHit extends PartialBy<YamlOutcomeStrongHit, "Text"> {}
/**
 * @internal
 */
export interface YamlAlterMoveOutcomeWeakHit extends PartialBy<YamlOutcomeWeakHit, "Text"> {}
/**
 * @internal
 */
export interface YamlAlterMoveOutcomeMiss extends PartialBy<YamlOutcomeMiss, "Text"> {}

/**
 * @internal
 */
export interface YamlAlterMoveTrigger extends YamlStub<YamlMoveTrigger, "", "Options"> {
  Options?: (YamlAlterMoveTriggerOptionAction|YamlAlterMoveTriggerOptionProgress)[] | undefined;
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionAction extends YamlStub<MoveTriggerOptionAction, "Method", "Using"> {
  Using?: MoveTriggerOptionAction["Using"] | undefined;
}

/**
 * @internal
 */
export interface YamlAlterMoveTriggerOptionProgress extends YamlStub<MoveTriggerOptionProgress, "Method", "Using"> {
  Using?: MoveTriggerOptionProgress["Using"] | undefined;
}

/**
 * @internal
 */
export interface YamlConditionMeter extends YamlStub<ConditionMeter, "Min"|"Value"|"Conditions"> {}

/**
 * @internal
 */
export interface YamlAssetState extends YamlStub<AssetState> {
}

/**
 * @internal
 */
export interface YamlInputSelect extends YamlStub<InputSelect, "", "Options"> {
  Options: YamlInputSelectOption[]
 }

/**
 * @internal
 */
export interface YamlInputSelectOption extends YamlStub<InputSelectOption,"","Set"> {
  Set: YamlInputSelectOptionSetter[];
}

/**
 * @internal
 */
export interface YamlInputSelectOptionSetter extends YamlStub<InputSelectOptionSetter> { }

/**
 * @internal
 */
export interface YamlInput extends YamlStub<Input, "Adjustable"> {};

/**
 * @internal
 */
export interface YamlInputClock extends YamlStub<InputClock, "Adjustable"> {}

/**
 * @internal
 */
export interface YamlInputText extends YamlStub<InputText, "Adjustable"> {}

/**
 * @internal
 */
export interface YamlInputNumber extends YamlStub<InputNumber, "Adjustable"|"Step"> {}
