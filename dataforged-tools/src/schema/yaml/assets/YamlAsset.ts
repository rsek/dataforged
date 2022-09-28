
import type { Asset, AssetAbility, InputToggle, AssetType, ConditionMeter, Input, InputClock, InputNumber, InputSelect, InputSelectOption, InputSelectOptionSetter, InputText, YamlAlterAsset, YamlAlterMomentum, YamlAlterMove, YamlMove, YamlStub, YamlStubNode, YamlTitleCaseTitle } from '@schema'
import type { StubExcept } from '@utils/types/Stub.js'

/**
 * @internal
 */
export interface YamlAssetType extends YamlStubNode<AssetType, '', 'Assets'> {
  Assets: {[key: string]: YamlAsset}
}

/**
 * @internal
 */
export interface YamlAsset extends YamlStubNode<StubExcept<Asset, '', 'Abilities'|'Inputs'|'Condition meter'|'States'>> {
  Title: YamlTitleCaseTitle
  Abilities: [YamlAssetAbility, YamlAssetAbility, YamlAssetAbility]
  Inputs?: {[key: string]: (YamlInputText|YamlInputSelect)}| undefined
  'Condition meter'?: YamlConditionMeter | undefined
  States?: YamlAssetState[] | undefined
}

/**
 * @internal
 */
export interface YamlAssetAbility extends YamlStub<AssetAbility, 'Enabled', 'Alter moves'|'Moves'|'Inputs'|'Alter momentum'|'Alter properties'> {
  'Alter moves'?: YamlAlterMove[] | undefined
  Moves?: YamlMove[]|undefined
  Inputs?: {[key: string]: (YamlInputText|YamlInputSelect|YamlInputClock|YamlInputNumber)}| undefined
  'Alter momentum'?: YamlAlterMomentum | undefined
  'Alter properties'?: YamlAlterAsset | undefined
}

/**
 * @internal
 */
export interface YamlConditionMeter extends YamlStub<ConditionMeter, 'Min'|'Value'|'Conditions'> {}

/**
 * @internal
 */
export interface YamlAssetState extends YamlStub<InputToggle> {
}

/**
 * @internal
 */
export interface YamlInputSelect extends YamlStub<InputSelect, '', 'Options'> {
  Options: {[key: string]: YamlInputSelectOption}
}

/**
 * @internal
 */
export interface YamlInputSelectOption extends YamlStub<InputSelectOption, '', 'Set attributes'> {
  'Set attributes': {[key: string]: YamlInputSelectOptionSetter}
}

/**
 * @internal
 */
export interface YamlInputSelectOptionSetter extends YamlStub<InputSelectOptionSetter> { }

/**
 * @internal
 */
export interface YamlInput extends YamlStub<Input, 'Adjustable'> {};

/**
 * @internal
 */
export interface YamlInputClock extends YamlStub<InputClock, 'Adjustable'> {}

/**
 * @internal
 */
export interface YamlInputText extends YamlStub<InputText, 'Adjustable'> {}

/**
 * @internal
 */
export interface YamlInputNumber extends YamlStub<InputNumber, 'Adjustable'|'Step'> {}
