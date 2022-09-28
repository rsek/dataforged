import { OutcomeMissBuilder, OutcomeStrongHitBuilder, OutcomeWeakHitBuilder } from '@builders'
import type { AlterMoveOutcomes, Outcomes, YamlAlterMoveOutcomes, YamlOutcomes } from '@schema'
import { formatId } from '@utils/formatId.js'

/**
 * @internal
 */
export class OutcomesBuilder implements Outcomes {
  $id: Outcomes['$id']
  'Strong hit': OutcomeStrongHitBuilder<true>
  'Weak hit': OutcomeWeakHitBuilder<true>
  'Miss': OutcomeMissBuilder<true>
  constructor (yaml: YamlOutcomes, id: Outcomes['$id']) {
    this.$id = id
    this['Strong hit'] = new OutcomeStrongHitBuilder<true>(yaml['Strong hit'], this.$id)
    this['Weak hit'] = new OutcomeWeakHitBuilder<true>(yaml['Weak hit'], this.$id)
    this.Miss = new OutcomeMissBuilder<true>(yaml.Miss, this.$id)
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomesBuilder implements AlterMoveOutcomes {
  $id: Outcomes['$id']
  'Strong hit'?: OutcomeStrongHitBuilder<false> | undefined
  'Weak hit'?: OutcomeWeakHitBuilder<false> | undefined
  'Miss'?: OutcomeMissBuilder<false> | undefined
  constructor (yaml: YamlAlterMoveOutcomes, parentId: string) {
    this.$id = formatId('Outcomes', parentId)

    if (yaml['Strong hit'] != null) {
      this['Strong hit'] = new OutcomeStrongHitBuilder<false>(yaml['Strong hit'], this.$id)
    }
    if (yaml['Weak hit'] != null) {
      this['Weak hit'] = new OutcomeWeakHitBuilder<false>(yaml['Weak hit'], this.$id)
    }
    if (yaml.Miss != null) {
      this.Miss = new OutcomeMissBuilder<false>(yaml.Miss, this.$id)
    }
  }
}
