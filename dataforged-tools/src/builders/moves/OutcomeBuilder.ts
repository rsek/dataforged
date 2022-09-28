import type { MoveReroll, OutcomeBase, OutcomeMiss, OutcomeMissMatch, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit, YamlOutcome, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeStrongHitMatch, YamlOutcomeWeakHit } from '@schema'
import { MoveOutcome } from '@schema'
import { formatId } from '@utils/formatId'

/**
 * @internal
 */
export abstract class OutcomeBuilder<O extends MoveOutcome, RequireText extends boolean = false> implements OutcomeBase<O, RequireText> {
  $id: OutcomeBase<O>['$id']
  Text?: RequireText extends true ? string : (string| undefined)
  'Count as'?: OutcomeBase<O>['Count as']
  Reroll?: MoveReroll | undefined
  'With a match'?: OutcomeBuilder<O> | undefined
  'In control'?: boolean | undefined
  constructor (yaml: YamlOutcome<O>, outcome: O, parentId: OutcomeBase<O>['$id']) {
    this.$id = formatId(MoveOutcome[outcome], parentId)
    this.Text = yaml.Text
    if (yaml.Reroll != null) {
      // console.log("has reroll data", json.Reroll);
      this.Reroll = {
        ...yaml.Reroll,
        $id: formatId('Reroll', this.$id)
      }
    }
    this['Count as'] = yaml['Count as']
    this['In control'] = yaml['In control']
  }
}

/**
 * @internal
 */
export class OutcomeMissBuilder<RequireText extends boolean = false> extends OutcomeBuilder<0, RequireText> implements OutcomeMiss {
  'With a match'?: undefined | OutcomeMissMatchBuilder
  constructor (yaml: YamlOutcomeMiss, parentId: string) {
    super(yaml, MoveOutcome.Miss, parentId)
    if (yaml['With a match'] != null) {
      this['With a match'] = new OutcomeMissMatchBuilder(yaml['With a match'], this.$id)
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
  'With a match'?: undefined
  constructor (yaml: YamlOutcomeWeakHit, parentId: string) {
    super(yaml, MoveOutcome['Weak hit'], parentId)
  }
}

/**
 * @internal
 */
export class OutcomeStrongHitBuilder<RequireText extends boolean = false> extends OutcomeBuilder<2, RequireText> implements OutcomeStrongHit {
  'With a match'?: undefined | OutcomeStrongHitMatchBuilder
  constructor (yaml: YamlOutcomeStrongHit, parentId: string) {
    super(yaml, MoveOutcome['Strong hit'], parentId)
    if (yaml['With a match'] != null) {
      this['With a match'] = new OutcomeStrongHitMatchBuilder(yaml['With a match'], this.$id)
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
