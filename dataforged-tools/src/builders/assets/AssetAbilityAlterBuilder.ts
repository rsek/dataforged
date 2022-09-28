import type { Alter } from '@schema'

export class AssetAbilityAlterBuilder implements Alter {
  Moves?: Alter['Moves']
  Properties?: Alter['Properties']
  Momentum?: Alter['Momentum']
}
