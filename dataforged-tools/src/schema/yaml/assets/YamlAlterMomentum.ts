import type { AlterMomentum, AlterMomentumBurn, AlterMomentumReset, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlAlterMomentum extends YamlStub<AlterMomentum, '', 'burn' | 'reset'> {
  burn?: YamlAlterMomentumBurn[] | undefined
  reset?: YamlAlterMomentumReset[] | undefined
}

/**
 * @internal
 */
export interface YamlAlterMomentumBurn extends YamlStub<AlterMomentumBurn, '', 'trigger' | 'effect'> {
  trigger: Omit<AlterMomentumBurn['trigger'], '$id'>
  effect: Omit<AlterMomentumBurn['effect'], '$id'>
}

/**
 * @internal
 */
export interface YamlAlterMomentumReset extends YamlStub<AlterMomentumReset, '', 'trigger'> {
  trigger: Omit<AlterMomentumReset['trigger'], '$id'>
}
