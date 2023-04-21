import type { MoveReroll, OutcomeBase, OutcomeMiss, OutcomeMissMatch, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit, YamlOutcome, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeStrongHitMatch, YamlOutcomeWeakHit } from '@schema'
import { MoveOutcome } from '@schema'
import { formatId } from '@utils/formatId'

/**
 * @internal
 */
export abstract class OutcomeBuilder<O extends MoveOutcome, RequireText extends boolean = false> implements OutcomeBase<O, RequireText> {
  $id: OutcomeBase<O>['$id']
  text?: RequireText extends true ? string : (string | undefined)
  'count_as'?: OutcomeBase<O>['count_as']
  reroll?: MoveReroll | undefined
  'with_a_match'?: OutcomeBuilder<O> | undefined
  'in_control'?: boolean | undefined
  constructor (yaml: YamlOutcome<O>, outcome: O, parentId: OutcomeBase<O>['$id']) {
    this.$id = formatId(MoveOutcome[outcome], parentId)
    this.text = yaml.text
    if (yaml.reroll != null) {
      // console.log("has reroll data", json.Reroll);
      this.reroll = {
        ...yaml.reroll,
        $id: formatId('Reroll', this.$id)
      }
    }
    this.count_as = yaml.count_as
    this.in_control = yaml.in_control
  }
}

/**
 * @internal
 */
export class OutcomeMissBuilder<RequireText extends boolean = false> extends OutcomeBuilder<0, RequireText> implements OutcomeMiss {
  'with_a_match'?: undefined | OutcomeMissMatchBuilder
  constructor (yaml: YamlOutcomeMiss, parentId: string) {
    super(yaml, MoveOutcome.miss, parentId)
    if (yaml.with_a_match != null) {
      this.with_a_match = new OutcomeMissMatchBuilder(yaml.with_a_match, this.$id)
    }
  }
}
/**
 * @internal
 */
export class OutcomeMissMatchBuilder<RequireText extends boolean = false> extends OutcomeMissBuilder<RequireText> implements OutcomeMissMatch {
  constructor (json: YamlOutcomeMiss, parentId: string) {
    super(json, parentId)
    this.$id = formatId('With a match', this.$id)
  }
}

/**
 * @internal
 */
export class OutcomeWeakHitBuilder<RequireText extends boolean = false> extends OutcomeBuilder<1, RequireText> implements OutcomeWeakHit {
  'with_a_match'?: undefined
  constructor (yaml: YamlOutcomeWeakHit, parentId: string) {
    super(yaml, MoveOutcome.weak_hit, parentId)
  }
}

/**
 * @internal
 */
export class OutcomeStrongHitBuilder<RequireText extends boolean = false> extends OutcomeBuilder<2, RequireText> implements OutcomeStrongHit {
  'with_a_match'?: undefined | OutcomeStrongHitMatchBuilder
  constructor (yaml: YamlOutcomeStrongHit, parentId: string) {
    super(yaml, MoveOutcome.strong_hit, parentId)
    if (yaml.with_a_match != null) {
      this.with_a_match = new OutcomeStrongHitMatchBuilder(yaml.with_a_match, this.$id)
    }
  }
}
/**
 * @internal
 */
export class OutcomeStrongHitMatchBuilder<RequireText extends boolean = false> extends OutcomeStrongHitBuilder<RequireText> implements OutcomeStrongHitMatch {
  constructor (json: YamlOutcomeStrongHitMatch, parentId: string) {
    super(json, parentId)
    this.$id = formatId('With a match', this.$id)
  }
}
