import { InputBuilder, MoveBuilder } from '@builders'
import type { Asset, AssetAbility, Game, InputClock, InputNumber, InputSelect, InputText, InputToggle, Move, YamlAssetAbility } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AssetAbilityBuilder implements AssetAbility {
  $id: AssetAbility['$id']
  label?: string | undefined
  text: string
  moves?: Move[] | undefined
  inputs?: { [key: SnakeCaseString]: (InputNumber | InputClock | InputText | InputSelect | InputToggle) } | undefined
  // alter?: Alter | undefined
  enabled: boolean
  constructor (yaml: YamlAssetAbility, id: AssetAbility['$id'], game: Game, parent: Asset) {
    this.$id = id
    this.label = yaml.label
    this.text = yaml.text
    if (yaml.inputs !== null) {
      this.inputs = _.mapValues(yaml.inputs, (inputYaml, inputKey) => InputBuilder.pickTypedInput(inputYaml, inputKey, this))
    }

    this.enabled = yaml.enabled ?? false
    // if (yaml['alter_momentum'] !== null) {
    //   this['alter_momentum'] = new AlterMomentumBuilder(yaml['alter_momentum'], this)
    // }
    // this['Alter moves'] = (yaml['Alter moves'] !== null)
    //   ? yaml['Alter moves'].map((alterMove, index) => {
    //     if (parent.usage.shared && ((alterMove.trigger?.by) === null)) {
    //       if (alterMove.trigger === null) {
    //         alterMove.trigger = {}
    //       }
    //       alterMove.trigger.by = { player: true, ally: true }
    //     }
    //     const newData = new AlterMoveBuilder(alterMove, this, index)
    //     return newData
    //   })
    //   : yaml['Alter moves']
    // if (yaml['Alter properties'] !== null) {
    //   this['Alter properties'] = new AlterAssetBuilder(yaml['Alter properties'], this.$id)
    // }
    if (yaml.moves !== null) {
      this.moves = yaml.moves?.map(moveJson => {
        const moveDataClone = _.cloneDeep(moveJson)
        moveDataClone.asset = parent.$id
        const fragment = moveDataClone._idFragment ?? moveDataClone.title.canonical
        moveDataClone.$id = formatId(fragment, this.$id).replace('/assets/', '/moves/assets/')
        moveDataClone.category = `${game}/moves/assets`
        // if ((moveDataClone.trigger.options !== null) && parent.condition_meter?.$id) {
        //   moveDataClone.trigger.options = replaceInAllStrings(moveDataClone.trigger.options, Replacement.AssetMeter, parent.condition_meter.$id)
        // }
        return new MoveBuilder(moveDataClone, this, game, parent.source)
      })
    }
  }
  // TODO: validate Ids
}
