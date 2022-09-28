
import { InputBuilder } from '@builders'
import type { Asset, AssetAbility, InputSelect, InputSelectAttributeDefinition, InputSelectOption, InputSelectOptionSetter, InputSelectOptionSetterMeter, InputSelectOptionSetterNumber, InputSelectOptionSetterStat, InputSelectOptionSetterString, InputSelectOptionType, YamlInputSelect, YamlInputSelectOption, YamlInputSelectOptionSetter } from '@schema'
import { InputType } from '@schema'
import { formatId } from '@utils'
import { badJsonError } from '@utils/logging/badJsonError.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class InputSelectBuilder extends InputBuilder implements InputSelect {
  'Input type': InputType.Select
  'Sets attributes': { [key: string]: InputSelectAttributeDefinition }
  Options: { [key: string]: InputSelectOption }
  Permanent: boolean
  constructor(yaml: YamlInputSelect, parent: AssetAbility | Asset) {
    super(yaml, parent)
    if (yaml["Input type"] !== InputType.Select) {
      throw badJsonError(this.constructor, yaml["Input type"], 'Expected InputType.Select!')
    }
    this.Permanent = yaml.Permanent ?? false
    this['Sets attributes'] = yaml['Sets attributes']

    this.Options = _.mapValues(yaml.Options, (optionJson, key) => new InputSelectOptionBuilder(optionJson, key, this))

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOptionBuilder implements InputSelectOption {
  $id: InputSelectOption['$id']
  Label: string
  'Set attributes': { [key: string]: (InputSelectOptionSetterStat | InputSelectOptionSetterMeter | InputSelectOptionSetterNumber | InputSelectOptionSetterString) }
  constructor(yaml: YamlInputSelectOption, fragment: string, parent: InputSelect) {
    this.$id = formatId(fragment, parent.$id, 'Options')
    this.Label = yaml.Label
    this['Set attributes'] = _.mapValues((yaml['Set attributes']), (attr, key) => new InputSelectOptionSetterBuilder(attr, key, this)) as this['Set attributes']
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetterBuilder implements InputSelectOptionSetter {
  $id: string
  'Input type': InputSelectOptionType
  Value: InputSelectOptionSetter['Value']
  constructor(yaml: YamlInputSelectOptionSetter, fragment: string, parent: InputSelectOption) {
    this.$id = formatId(fragment, parent.$id)
    this.'Input type' = yaml.'Input type'
    this.Value = yaml.Value
  }
}
