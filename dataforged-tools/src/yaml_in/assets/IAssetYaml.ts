
import type { IAlterMove, IAlterMoveOutcomes, IAsset, IAssetAbility, IAssetState, IAssetType, IAssetUsage , IConditionMeter, IDisplay , IInput , IInputClock, IInputNumber, IInputSelect, IInputSelectOption , IInputText, IMoveTriggerOptionAction, IMoveTriggerOptionProgress } from "@json_out/index.js";
import type { PartialDeep, PartialExcept } from "@utils/index.js";
import type { StubBy , StubExcept } from "@utils/types/Stub.js";
import type { IMoveTriggerYaml, IMoveYaml, YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IAssetTypeYaml extends YamlStub<IAssetType, "Source", "Assets"|"Display"|"Usage"> {
  Assets: IAssetYaml[];
  Display: Partial<IDisplay>
  Usage?: Partial<IAssetUsage> | undefined;
 }

/**
 * @internal
 */
export interface IAssetYaml extends StubExcept<IAsset,"Name", "Abilities"|"Inputs"|"Condition Meter"|"States"> {
  Abilities: [IAssetAbilityYaml,IAssetAbilityYaml,IAssetAbilityYaml];
  Inputs?: (IInputTextYaml|IInputSelectYaml)[]|undefined;
  "Condition Meter"?: IConditionMeterYaml | undefined;
  States?: IAssetStateYaml[] | undefined;
}


/**
 * @internal
 */
export interface IAssetAbilityYaml extends StubBy<IAssetAbility, "$id"|"Enabled", "Alter Moves"|"Moves"> {
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
  Moves?: IMoveYaml[]|undefined;
}


/**
 * @internal
 */
export interface IAlterMoveYaml extends YamlStub<IAlterMove, "", "Trigger"|"Outcomes"> {
  Trigger?: IAlterMoveTriggerYaml | undefined;
  Outcomes?: IAlterMoveOutcomesYaml | undefined;
}

/**
 * @internal
 */
export interface IAlterMoveOutcomesYaml extends PartialDeep<IAlterMoveOutcomes> {}


/**
 * @internal
 */
export interface IAlterMoveTriggerYaml extends YamlStub<IMoveTriggerYaml, "Options"> {
  Options?: (IAlterMoveTriggerOptionActionYaml|IAlterMoveTriggerOptionProgressYaml)[]
}

/**
 * @internal
 */
export interface IAlterMoveTriggerOptionActionYaml extends YamlStub<IMoveTriggerOptionAction, "Method", "Using"> {
  Using?: IMoveTriggerOptionAction["Using"] | undefined;
}

/**
 * @internal
 */
export interface IAlterMoveTriggerOptionProgressYaml extends YamlStub<IMoveTriggerOptionProgress, "Method", "Using"> {
  Using?: IMoveTriggerOptionProgress["Using"] | undefined;
}

/**
 * @internal
 */
export interface IConditionMeterYaml extends YamlStub<IConditionMeter, "Min"|"Value"|"Conditions"> {}

/**
 * @internal
 */
export interface IAssetStateYaml extends YamlStub<IAssetState> {
  Name: string;
}



/**
 * @internal
 */
export interface IInputSelectYaml extends StubBy<IInputSelect, never, "$id"|"Options"> {
  Options: IInputSelectOptionYaml[]
 }

/**
 * @internal
 */
export interface IInputSelectOptionYaml extends StubBy<IInputSelectOption, never, "$id"> { }


/**
 * @internal
 */
export type IInputYaml= StubBy<IInput, "Adjustable", "$id">;

/**
 * @internal
 */
export interface IInputClockYaml extends StubBy<IInputClock, "Adjustable", "$id"> {}

/**
 * @internal
 */
export interface IInputTextYaml extends StubBy<IInputText, "Adjustable", "$id"> {}

/**
 * @internal
 */
export interface IInputNumberYaml extends StubBy<IInputNumber, "Adjustable", "$id"> {}
