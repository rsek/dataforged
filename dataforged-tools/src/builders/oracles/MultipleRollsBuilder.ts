import type { MultipleRolls } from '@schema'

/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRollsBuilder implements MultipleRolls {
  amount: number
  'allow_duplicates': boolean
  'make_it_worse': boolean
  constructor (yaml: Partial<MultipleRolls>) {
    this.amount = yaml.amount ?? 2
    this.allow_duplicates = yaml.allow_duplicates ?? false
    this.make_it_worse = yaml.make_it_worse ?? false
  }
}
