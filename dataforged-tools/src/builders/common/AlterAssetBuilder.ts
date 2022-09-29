import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { AlterAsset, AlterAssetAbility, AlterAssetAttachment, AlterAssetConditionMeter, InputClock, InputNumber, InputSelect, InputText, InputToggle, MixinAlter, YamlAlterAsset } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

export class AlterAssetBuilder extends NodeBuilder<YamlAlterAsset, AlterAsset, MixinAlter> implements AlterAsset {
  abilities?: AlterAssetAbility[] | undefined
  attachments?: AlterAssetAttachment | undefined
  condition_meter?: AlterAssetConditionMeter | undefined
  states?: InputToggle[] | undefined
  inputs?: { [key: SnakeCaseString]: InputNumber | InputClock | InputText | InputSelect } | undefined
  requirement?: string | undefined
  // FIXME
}
