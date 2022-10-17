import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { AlterAsset, AssetAbility, MixinAlter } from '@schema'

// @ts-expect-error
export class AssetAbilityAlterBuilder extends NodeBuilder<MixinAlter, AlterAsset, AssetAbility> implements MixinAlter, AlterAsset {
  moves?: MixinAlter['moves']
  properties?: MixinAlter['properties']
  momentum?: MixinAlter['momentum']
}
