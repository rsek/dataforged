import { OutcomeMissBuilder, OutcomeStrongHitBuilder, OutcomeWeakHitBuilder } from '@builders'
import type { AlterMoveOutcomes, Outcomes, YamlAlterMoveOutcomes, YamlOutcomes } from '@schema'
import { formatId } from '@utils/formatId.js'

/**
 * @internal
 */
export class OutcomesBuilder implements Outcomes {
  $id: Outcomes['$id']
  'strong_hit': OutcomeStrongHitBuilder<true>
  'weak_hit': OutcomeWeakHitBuilder<true>
  'miss': OutcomeMissBuilder<true>
  constructor (yaml: YamlOutcomes, id: Outcomes['$id']) {
    this.$id = id
    this.strong_hit = new OutcomeStrongHitBuilder<true>(yaml.strong_hit, this.$id)
    this.weak_hit = new OutcomeWeakHitBuilder<true>(yaml.weak_hit, this.$id)
    this.miss = new OutcomeMissBuilder<true>(yaml.miss, this.$id)
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomesBuilder implements AlterMoveOutcomes {
  $id: Outcomes['$id']
  'strong_hit'?: OutcomeStrongHitBuilder<false> | undefined
  'weak_hit'?: OutcomeWeakHitBuilder<false> | undefined
  'miss'?: OutcomeMissBuilder<false> | undefined
  constructor (yaml: YamlAlterMoveOutcomes, parentId: string) {
    this.$id = formatId('Outcomes', parentId)

    if (yaml.strong_hit != null) {
      this.strong_hit = new OutcomeStrongHitBuilder<false>(yaml.strong_hit, this.$id)
    }
    if (yaml.weak_hit != null) {
      this.weak_hit = new OutcomeWeakHitBuilder<false>(yaml.weak_hit, this.$id)
    }
    if (yaml.miss != null) {
      this.miss = new OutcomeMissBuilder<false>(yaml.miss, this.$id)
    }
  }
}
