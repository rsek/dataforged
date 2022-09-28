import type { AlterMomentum, AlterMomentumBurn, AlterMomentumReset, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlAlterMomentum extends YamlStub<AlterMomentum, '', 'Burn' | 'Reset'> {
  Burn?: YamlAlterMomentumBurn[] | undefined
  Reset?: YamlAlterMomentumReset[] | undefined
}

/**
 * @internal
 */
export interface YamlAlterMomentumBurn extends YamlStub<AlterMomentumBurn, '', 'Trigger'|'Effect'> {
  Trigger: Omit<AlterMomentumBurn['Trigger'], '$id'>
  Effect: Omit<AlterMomentumBurn['Effect'], '$id'>
}

/**
 * @internal
 */
export interface YamlAlterMomentumReset extends YamlStub<AlterMomentumReset, '', 'Trigger'> {
  Trigger: Omit<AlterMomentumReset['Trigger'], '$id'>
}
