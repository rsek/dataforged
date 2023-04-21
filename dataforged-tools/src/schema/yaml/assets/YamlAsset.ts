
import type { Asset, AssetAbility, AssetType, ConditionMeter, Input, InputClock, InputNumber, InputSelect, InputSelectOption, InputSelectOptionSetter, InputText, InputToggle, MixinAlter, YamlAlterAsset, YamlAlterMomentum, YamlAlterMove, YamlMove, YamlStub, YamlStubNode, YamlTitleCaseTitle } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import type { StubExcept } from '@utils/types/Stub.js'

/**
 * @internal
 */
export interface YamlAssetType extends YamlStubNode<AssetType, '', 'assets'> {
  assets: { [key: SnakeCaseString]: YamlAsset }
}

/**
 * @internal
 */
export interface YamlAsset extends YamlStubNode<Asset, '', 'title' | 'abilities' | 'inputs' | 'condition_meter' | 'asset_type'> {
  title: YamlTitleCaseTitle
  abilities: [YamlAssetAbility, YamlAssetAbility, YamlAssetAbility]
  inputs?: { [key: SnakeCaseString]: (YamlInputText | YamlInputSelect | YamlInputNumber | YamlInputClock | YamlInputClock) }
  | undefined
  condition_meter?: YamlConditionMeter | undefined
}

/**
 * @internal
 */
export interface YamlAssetAbility extends YamlStub<AssetAbility, 'enabled', 'alter' | 'moves' | 'inputs'> {
  moves?: YamlMove[] | undefined
  inputs?: { [key: SnakeCaseString]: (YamlInputText | YamlInputSelect | YamlInputNumber | YamlInputClock | YamlInputClock) } | undefined
  alter?: YamlAlter
}

/**
 * @internal
 */
export interface YamlAlter extends YamlStub<MixinAlter, '', 'moves' | 'properties' | 'momentum'> {
  moves?: YamlAlterMove[] | undefined
  properties?: YamlAlterAsset | undefined
  momentum?: YamlAlterMomentum | undefined
}

/**
 * @internal
 */
export interface YamlConditionMeter extends YamlStub<ConditionMeter, 'min' | 'value'> { }

/**
 * @internal
 */
export interface YamlInputToggle extends YamlStub<InputToggle> {
}

/**
 * @internal
 */
export interface YamlInputSelect extends YamlStub<InputSelect, '', 'options'> {
  options: { [key: SnakeCaseString]: YamlInputSelectOption }
}

/**
 * @internal
 */
export interface YamlInputSelectOption extends YamlStub<InputSelectOption, '', 'set_attributes'> {
  set_attributes: { [key: SnakeCaseString]: YamlInputSelectOptionSetter }
}

/**
 * @internal
 */
export interface YamlInputSelectOptionSetter extends YamlStub<InputSelectOptionSetter> { }

/**
 * @internal
 */
export interface YamlInput extends YamlStub<Input> { };

/**
 * @internal
 */
export interface YamlInputClock extends YamlStub<InputClock> { }

/**
 * @internal
 */
export interface YamlInputText extends YamlStub<InputText> { }

/**
 * @internal
 */
export interface YamlInputNumber extends YamlStub<InputNumber> { }
