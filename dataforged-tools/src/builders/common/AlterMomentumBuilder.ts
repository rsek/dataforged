import type { AlterMomentum, AlterMomentumBurn, AlterMomentumReset, AssetAbility, MixinText, YamlAlterMomentum, YamlAlterMomentumBurn, YamlAlterMomentumReset } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class AlterMomentumBuilder implements AlterMomentum {
  burn?: AlterMomentumBurn[] | undefined
  reset?: AlterMomentumReset[] | undefined
  $id: string
  constructor (yaml: YamlAlterMomentum, parent: AssetAbility) {
    this.$id = formatId('Alter_momentum', parent.$id)
    if (yaml.burn != null) {
      this.burn = yaml.burn.map(burnData => new AlterMomentumBurnBuilder(burnData, this))
    }
    if (yaml.reset != null) {
      this.reset = yaml.reset.map(resetData => new AlterMomentumResetBuilder(resetData, this))
    }
  }
}
/**
 * @internal
 */
export class AlterMomentumBurnBuilder implements AlterMomentumBurn {
  trigger: MixinText
  effect: MixinText
  outcomes?: AlterMomentumBurn['outcomes'] | undefined
  $id: string
  constructor (yaml: YamlAlterMomentumBurn, parent: AlterMomentum) {
    this.$id = formatId('Burn', parent.$id)
    this.trigger = { ...yaml.trigger, $id: formatId('Trigger', this.$id) }
    this.effect = { ...yaml.effect, $id: formatId('Effect', this.$id) }
    this.outcomes = yaml.outcomes
  }
}
/**
 * @internal
 */
export class AlterMomentumResetBuilder implements AlterMomentumReset {
  trigger: MixinText
  value: number
  $id: string
  constructor (yaml: YamlAlterMomentumReset, parent: AlterMomentum) {
    this.$id = formatId('Reset', parent.$id)
    this.trigger = { ...yaml.trigger, $id: formatId('Trigger', this.$id) }
    this.value = yaml.value
  }
}
