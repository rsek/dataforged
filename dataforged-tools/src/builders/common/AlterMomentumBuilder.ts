import type { AlterMomentum, AlterMomentumBurn, AlterMomentumReset, AssetAbility, HasText, YamlAlterMomentum, YamlAlterMomentumBurn, YamlAlterMomentumReset } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class AlterMomentumBuilder implements AlterMomentum {
  Burn?: AlterMomentumBurn[] | undefined
  Reset?: AlterMomentumReset[] | undefined
  $id: string
  constructor (yaml: YamlAlterMomentum, parent: AssetAbility) {
    this.$id = formatId('Alter_momentum', parent.$id)
    if (yaml.Burn != null) {
      this.Burn = yaml.Burn.map(burnData => new AlterMomentumBurnBuilder(burnData, this))
    }
    if (yaml.Reset != null) {
      this.Reset = yaml.Reset.map(resetData => new AlterMomentumResetBuilder(resetData, this))
    }
  }
}
/**
 * @internal
 */
export class AlterMomentumBurnBuilder implements AlterMomentumBurn {
  Trigger: HasText
  Effect: HasText
  Outcomes?: AlterMomentumBurn['Outcomes'] | undefined
  $id: string
  constructor (yaml: YamlAlterMomentumBurn, parent: AlterMomentum) {
    this.$id = formatId('Burn', parent.$id)
    this.Trigger = { ...yaml.Trigger, $id: formatId('Trigger', this.$id) }
    this.Effect = { ...yaml.Effect, $id: formatId('Effect', this.$id) }
    this.Outcomes = yaml.Outcomes
  }
}
/**
 * @internal
 */
export class AlterMomentumResetBuilder implements AlterMomentumReset {
  Trigger: HasText
  Value: number
  $id: string
  constructor (yaml: YamlAlterMomentumReset, parent: AlterMomentum) {
    this.$id = formatId('Reset', parent.$id)
    this.Trigger = { ...yaml.Trigger, $id: formatId('Trigger', this.$id) }
    this.Value = yaml.Value
  }
}
