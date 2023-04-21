import { InputToggleBuilder } from '@builders'
import type { AlterAsset, YamlAlterAsset } from '@schema'
import { formatId } from '@utils'

export class AlterAssetBuilder implements AlterAsset {
  $id: string
  abilities?: AlterAsset['abilities']
  attachments?: AlterAsset['attachments']
  'condition_meter'?: AlterAsset['condition_meter']
  constructor (yaml: YamlAlterAsset, parentId: string) {
    this.$id = formatId('Alter Properties', parentId)
    this.abilities = yaml.abilities
    this.attachments = yaml.attachments
    this.condition_meter = yaml.condition_meter
  }
}
