import type { MoveReroll , OutcomeInfoBase, OutcomeMiss, OutcomeMissMatch, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit } from "@schema_json";
import { MoveOutcome } from "@schema_json";
import { formatId } from "@utils/formatId.js";
import type { YamlOutcomeInfoBase, YamlOutcomeMiss, YamlOutcomeStrongHit, YamlOutcomeStrongHitMatch, YamlOutcomeWeakHit } from "@schema_yaml";

/**
 * @internal
 */
export abstract class MoveOutcomeBuilder<O extends MoveOutcome, RequireText extends boolean = false> implements OutcomeInfoBase<O,RequireText> {
  $id: OutcomeInfoBase<O>["$id"];
  Text?: RequireText extends true ? string : (string| undefined);
  "Count as"?: OutcomeInfoBase<O>["Count as"];
  Reroll?: MoveReroll | undefined;
  "With a Match"?: MoveOutcomeBuilder<O> | undefined;
  "In Control"?: boolean | undefined;
  constructor(json: YamlOutcomeInfoBase<O>, outcome: O, parentId: OutcomeInfoBase<O>["$id"]) {
    this.$id = formatId(MoveOutcome[outcome],parentId);
    this.Text = json.Text;
    if (json.Reroll){
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
export class MoveOutcomeMissBuilder<RequireText extends boolean = false> extends MoveOutcomeBuilder<0,RequireText> implements OutcomeMiss {
  "With a Match"?: undefined | MoveOutcomeMissMatchBuilder;
  constructor(json: YamlOutcomeMiss, parentId: string) {
    super(json, MoveOutcome.Miss, parentId);
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcomeMissMatchBuilder(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class MoveOutcomeMissMatchBuilder<RequireText extends boolean = false> extends MoveOutcomeMissBuilder<RequireText> implements OutcomeMissMatch {
  constructor(json:YamlOutcomeMiss, parentId: string) {
    super(json, parentId);
    this.$id = formatId("With a match",this.$id);
  }
}
/**
 * @internal
 */
export class MoveOutcomeWeakHitBuilder<RequireText extends boolean = false> extends MoveOutcomeBuilder<1,RequireText> implements OutcomeWeakHit {
  "With a Match"?: undefined;
  constructor(json: YamlOutcomeWeakHit, parentId: string) {
    super(json, MoveOutcome["Weak Hit"], parentId );
  }
}

/**
 * @internal
 */
export class MoveOutcomeStrongHitBuilder<RequireText extends boolean = false> extends MoveOutcomeBuilder<2,RequireText> implements OutcomeStrongHit {
  "With a Match"?: undefined | MoveOutcomeStrongHitMatchBuilder;
  constructor(json: YamlOutcomeStrongHit, parentId: string) {
    super(json, MoveOutcome["Strong Hit"],parentId);
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcomeStrongHitMatchBuilder(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class MoveOutcomeStrongHitMatchBuilder<RequireText extends boolean = false> extends MoveOutcomeStrongHitBuilder<RequireText> implements OutcomeStrongHitMatch {
  constructor(json:YamlOutcomeStrongHitMatch, parentId: string) {
    super(json, parentId);
    this.$id = formatId("With a match",this.$id);
  }
}