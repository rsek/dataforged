import type { IAlterMomentum, IAlterMove, IAlterMoveOutcomes, IAsset, IAssetAbility, IAssetState, IAssetType, IAssetUsage, IConditionMeter, IDisplay, IInput, IInputClock, IInputNumber, IInputSelect, IInputSelectOption, IInputSelectOptionSetter, IInputText, IMoveTriggerOptionAction, IMoveTriggerOptionProgress } from "../../json_out/index.js";
import type { PartialBy, PartialDeep } from "../../utils/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
import type { IMoveTriggerYaml, IMoveYaml, YamlStub, YamlStubTitle } from "../index.js";
/**
 * @internal
 */
export interface IAssetTypeYaml extends YamlStubTitle<IAssetType, "Source", "Assets" | "Display" | "Usage" | "$id" | "States"> {
    Assets: IAssetYaml[];
    Display?: Partial<IDisplay> | undefined;
    Usage?: Partial<IAssetUsage> | undefined;
    States?: IAssetStateYaml[] | undefined;
}
/**
 * @internal
 */
export interface IAssetYaml extends YamlStubTitle<StubExcept<IAsset, "", "Abilities" | "Inputs" | "Condition Meter" | "States" | "$id">> {
    Abilities: [IAssetAbilityYaml, IAssetAbilityYaml, IAssetAbilityYaml];
    Inputs?: (IInputTextYaml | IInputSelectYaml)[] | undefined;
    "Condition Meter"?: IConditionMeterYaml | undefined;
    States?: IAssetStateYaml[] | undefined;
}
/**
 * @internal
 */
export interface IAssetAbilityYaml extends YamlStub<IAssetAbility, "Enabled", "Alter Moves" | "Moves" | "Inputs" | "Alter Momentum"> {
    "Alter Moves"?: IAlterMoveYaml[] | undefined;
    Moves?: IMoveYaml[] | undefined;
    Inputs?: (IInputTextYaml | IInputClockYaml | IInputNumberYaml)[] | undefined;
    "Alter Momentum"?: YamlStub<IAlterMomentum>;
}
/**
 * @internal
 */
export interface IAlterMoveYaml extends YamlStub<IAlterMove, "", "Trigger" | "Outcomes"> {
    Trigger?: IAlterMoveTriggerYaml | undefined;
    Outcomes?: IAlterMoveOutcomesYaml | undefined;
}
/**
 * @internal
 */
export interface IAlterMoveOutcomesYaml extends PartialDeep<IAlterMoveOutcomes> {
}
/**
 * @internal
 */
export interface IAlterMoveTriggerYaml extends YamlStub<IMoveTriggerYaml, "", "Options"> {
    Options?: (IAlterMoveTriggerOptionActionYaml | IAlterMoveTriggerOptionProgressYaml)[] | undefined;
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
export interface IConditionMeterYaml extends YamlStub<PartialBy<IConditionMeter>, "Min" | "Value" | "Conditions"> {
}
/**
 * @internal
 */
export interface IAssetStateYaml extends YamlStub<IAssetState> {
}
/**
 * @internal
 */
export interface IInputSelectYaml extends YamlStub<IInputSelect, "", "Options"> {
    Options: IInputSelectOptionYaml[];
}
/**
 * @internal
 */
export interface IInputSelectOptionYaml extends YamlStub<IInputSelectOption, "", "Set"> {
    Set: IInputSelectOptionSetterYaml[];
}
/**
 * @internal
 */
export interface IInputSelectOptionSetterYaml extends YamlStub<IInputSelectOptionSetter> {
}
/**
 * @internal
 */
export interface IInputYaml extends YamlStub<IInput, "Adjustable"> {
}
/**
 * @internal
 */
export interface IInputClockYaml extends YamlStub<IInputClock, "Adjustable"> {
}
/**
 * @internal
 */
export interface IInputTextYaml extends YamlStub<IInputText, "Adjustable"> {
}
/**
 * @internal
 */
export interface IInputNumberYaml extends YamlStub<IInputNumber, "Adjustable" | "Step"> {
}
//# sourceMappingURL=IAssetYaml.d.ts.map