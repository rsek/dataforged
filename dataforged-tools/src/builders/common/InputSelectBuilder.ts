
import { InputBuilder } from '@builders'
import type { Asset, AssetAbility, InputSelect, InputSelectAttributeDefinition, InputSelectOption, InputSelectOptionSetter, InputSelectOptionSetterMeter, InputSelectOptionSetterNumber, InputSelectOptionSetterStat, InputSelectOptionSetterString, InputSelectOptionType, YamlInputSelect, YamlInputSelectOption, YamlInputSelectOptionSetter } from '@schema'
import { InputType } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import { badJsonError } from '@utils/logging/badJsonError.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class InputSelectBuilder extends InputBuilder implements InputSelect {
  readonly input_type = InputType.Select
  sets_attributes: { [key: SnakeCaseString]: InputSelectAttributeDefinition }
  options: { [key: SnakeCaseString]: InputSelectOption }
  permanent: boolean
  constructor (yaml: YamlInputSelect, key: SnakeCaseString, parent: AssetAbility | Asset) {
    super(yaml, key, parent)
    if (yaml.input_type !== InputType.Select) {
      throw badJsonError(this.constructor, yaml.input_type, 'Expected InputType.Select!')
    }
    this.permanent = yaml.permanent ?? false
    this.sets_attributes = yaml.sets_attributes

    this.options = _.mapValues(yaml.options, (optionJson, key) => new InputSelectOptionBuilder(optionJson, key, this))

    // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
  }
}

/**
 * @internal
 */
export class InputSelectOptionBuilder implements InputSelectOption {
  $id: InputSelectOption['$id']
  label: string
  set_attributes: { [key: SnakeCaseString]: (InputSelectOptionSetterStat | InputSelectOptionSetterMeter | InputSelectOptionSetterNumber | InputSelectOptionSetterString) }
  constructor (yaml: YamlInputSelectOption, fragment: string, parent: InputSelect) {
    this.$id = formatId(fragment, parent.$id, 'Options')
    this.label = yaml.label
    this.set_attributes = _.mapValues((yaml.set_attributes), (attr, key) => new InputSelectOptionSetterBuilder(attr, key, this)) as this['set_attributes']
  }
}

/**
 * @internal
 */
export class InputSelectOptionSetterBuilder implements InputSelectOptionSetter {
  $id: string
  attribute_type: InputSelectOptionType
  value: InputSelectOptionSetter['value']
  constructor (yaml: YamlInputSelectOptionSetter, fragment: string, parent: InputSelectOption) {
    this.$id = formatId(fragment, parent.$id)
    this.attribute_type = yaml.attribute_type
    this.value = yaml.value
  }
}
