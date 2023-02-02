import { AssetAbilityBuilder, ConditionMeterBuilder, DisplayBuilder, InputBuilder, InputToggleBuilder, SourceInheritorBuilder, TitleBuilder } from '@builders'
import { InputSelectOptionType, InputType, Replacement, YamlInput } from '@schema'
import type { Asset, AssetAbility, AssetAttachment, AssetType, AssetUsage, ConditionMeter, Display, Game, InputToggle, Source, Title, YamlAsset } from '@schema'
import { formatId } from '@utils'
import { badJsonError } from '@utils/logging/badJsonError.js'
import { buildLog } from '@utils/logging/buildLog.js'
import { replaceInAllStrings } from '@utils/object_transform/replaceInAllStrings.js'
import _ from 'lodash'

/**
 * @internal
 */
export class AssetBuilder extends SourceInheritorBuilder implements Asset {
  $id: Asset['$id']
  title: Title
  asset_type: AssetType['$id']
  display: Display
  usage: AssetUsage
  attachments?: AssetAttachment | undefined
  requirement?: string | undefined
  inputs?: Asset['inputs']
  abilities: [AssetAbility, AssetAbility, AssetAbility]
  condition_meter?: ConditionMeter | undefined
  constructor (yaml: YamlAsset, game: Game, parent: AssetType, rootSource: Source) {
    super(yaml.source ?? {}, rootSource)
    this.asset_type = parent.$id
    const fragment = yaml._idFragment ?? yaml.title.short ?? yaml.title.standard ?? yaml.title.canonical
    this.$id = formatId(fragment, this.asset_type)
    buildLog(this.constructor, `Building: ${this.$id}`)
    this.title = new TitleBuilder(yaml.title, this)
    this.display = new DisplayBuilder({
      icon: yaml.display?.icon,
      color: yaml.display?.color ?? parent.display.color
    })
    this.usage = {
      shared: !!['command vehicle', 'support vehicle', 'module'].includes(parent.title.short?.toLowerCase() ?? parent.title.canonical.toLowerCase())
    }
    this.attachments = yaml.attachments
    if (yaml.inputs != null) {
      this.inputs = _.mapValues(yaml.inputs, (inputYaml, key) => {
        const result = InputBuilder.pickTypedInput(inputYaml, key, this)
        if (result.input_type === InputType.Select) {
          _.forEach(result.sets_attributes, hint => {
            let searchValue: Replacement | undefined
            let replaceValue: string = this.$id
            switch (hint.attribute_type) {
              case InputSelectOptionType.ConditionMeter:
                searchValue = Replacement.AssetSelectMeter
                replaceValue = this.$id
                break
              case InputSelectOptionType.Stat:
                searchValue = Replacement.AssetSelectStat
                replaceValue = this.$id
                break
              default:
                break
            }
            if (searchValue) {
              yaml.abilities = replaceInAllStrings(yaml.abilities, searchValue, replaceValue)
            }
          })
        }
        return result
      })
    }
    this.requirement = yaml.requirement
    this.condition_meter = (yaml.condition_meter != null) ? new ConditionMeterBuilder(yaml.condition_meter, formatId('condition_meter', this.$id), this.asset_type) : undefined
    if (yaml.abilities.length !== 3) {
      throw badJsonError(this.constructor, yaml.abilities, `Asset ${this.$id} doesn't have 3 abilities!`)
    } else {
      this.abilities = yaml.abilities.map((abilityJson, index) => new AssetAbilityBuilder(abilityJson, formatId((index + 1).toString(), this.$id), game, this)) as [AssetAbilityBuilder, AssetAbilityBuilder, AssetAbilityBuilder]
    }

    _.merge(this, replaceInAllStrings(this, Replacement.Asset, this.$id))

    if (this.condition_meter != null) {
      _.merge(this, replaceInAllStrings(this, Replacement.AssetMeter, this.condition_meter.$id))
    }
  }
}
