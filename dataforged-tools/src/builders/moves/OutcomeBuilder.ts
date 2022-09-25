import type { MoveReroll, OutcomeBase, OutcomeMiss, OutcomeMissMatch, OutcomeStrongHit , OutcomeStrongHitMatch, OutcomeWeakHit, YamlOutcome, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeStrongHitMatch, YamlOutcomeWeakHit } from "@schema";
import { MoveOutcome } from "@schema";
import { formatId } from "@utils/formatId";

/**
 * @internal
 */
export abstract class OutcomeBuilder<O extends MoveOutcome, RequireText extends boolean = false> implements OutcomeBase<O, RequireText> {
  $id: OutcomeBase<O>["$id"];
  Text?: RequireText extends true ? string : (string| undefined);
  "Count as"?: OutcomeBase<O>["Count as"];
  Reroll?: MoveReroll | undefined;
  "With a Match"?: OutcomeBuilder<O> | undefined;
  "In Control"?: boolean | undefined;
  constructor(json: YamlOutcome<O>, outcome: O, parentId: OutcomeBase<O>["$id"]) {
    this.$id = formatId(MoveOutcome[outcome],parentId);
    this.Text = json.Text;
    if (json.Reroll) {
      // console.log("has reroll data", json.Reroll);
      this.Reroll = {
        ...json.Reroll,
        $id: formatId("Reroll",this.$id ),
      };
    }
    this["Count as"] = json["Count as"];
    this["In Control"] = json["In Control"];
  }
}

/**
 * @internal
 */
export class OutcomeMissBuilder<RequireText extends boolean = false> extends OutcomeBuilder<0,RequireText> implements OutcomeMiss {
  "With a Match"?: undefined | OutcomeMissMatchBuilder;
  constructor(json: YamlOutcomeMiss, parentId: string) {
    super(json, MoveOutcome.Miss, parentId);
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeMissMatchBuilder(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class OutcomeMissMatchBuilder<RequireText extends boolean = false> extends OutcomeMissBuilder<RequireText> implements OutcomeMissMatch {
  constructor(json:YamlOutcomeMiss, parentId: string) {
    super(json, parentId);
    this.$id = formatId("With a match",this.$id);
  }
}

/**
 * @internal
 */
export class OutcomeWeakHitBuilder<RequireText extends boolean = false> extends OutcomeBuilder<1,RequireText> implements OutcomeWeakHit {
  "With a Match"?: undefined;
  constructor(json: YamlOutcomeWeakHit, parentId: string) {
    super(json, MoveOutcome["Weak Hit"], parentId );
  }
}

/**
 * @internal
 */
export class OutcomeStrongHitBuilder<RequireText extends boolean = false> extends OutcomeBuilder<2,RequireText> implements OutcomeStrongHit {
  "With a Match"?: undefined | OutcomeStrongHitMatchBuilder;
  constructor(json: YamlOutcomeStrongHit, parentId: string) {
    super(json, MoveOutcome["Strong Hit"],parentId);
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeStrongHitMatchBuilder(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class OutcomeStrongHitMatchBuilder<RequireText extends boolean = false> extends OutcomeStrongHitBuilder<RequireText> implements OutcomeStrongHitMatch {
  constructor(json:YamlOutcomeStrongHitMatch, parentId: string) {
    super(json, parentId);
    this.$id = formatId("With a match",this.$id);
  }
}