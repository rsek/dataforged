import type { AlterAsset, AlterAssetAbility, AlterAssetAttachment, AlterAssetConditionMeter, InputClock, InputNumber, InputSelect, InputText, InputToggle } from '@schema'

export class AlterAssetBuilder implements AlterAsset {
  $id: string
  Abilities?: AlterAssetAbility[] | undefined
  Attachments?: AlterAssetAttachment | undefined
  'Condition meter'?: AlterAssetConditionMeter | undefined
  States?: InputToggle[] | undefined
  Inputs?: { [key: string]: InputNumber | InputClock | InputText | InputSelect } | undefined
  Requirement?: string | undefined
}
