import { AssetStateBuilder } from '@builders'
import type { AlterAsset, YamlAlterAsset } from '@schema'
import { formatId } from '@utils'

export class AlterAssetBuilder implements AlterAsset {
  $id: string
  Abilities?: AlterAsset['Abilities']
  Attachments?: AlterAsset['Attachments']
  'Condition meter'?: AlterAsset['Condition meter']
  States?: AlterAsset['States']
  constructor (yaml: YamlAlterAsset, parentId: string) {
    this.$id = formatId('Alter Properties', parentId)
    this.Abilities = yaml.Abilities
    this.Attachments = yaml.Attachments
    this['Condition meter'] = yaml['Condition meter']
    if (yaml.States !== null) {
      this.States = yaml.States.map(state => new AssetStateBuilder(state, this))
    }
  }
}
