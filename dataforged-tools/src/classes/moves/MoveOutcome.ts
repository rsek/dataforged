import type { IMoveReroll , IOutcomeInfoBase, IOutcomeMiss, IOutcomeMissMatch, IOutcomeStrongHit, IOutcomeStrongHitMatch, IOutcomeWeakHit, MoveOutcome } from "@json_out/index.js";
import type { IOutcomeInfoBaseYaml, IOutcomeMissYaml, IOutcomeStrongHitMatchYaml, IOutcomeStrongHitYaml, IOutcomeWeakHitYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export abstract class OutcomeInfoBase<O extends MoveOutcome> implements IOutcomeInfoBase<O> {
  $id: IOutcomeInfoBase<O>["$id"];
  Text: string;
  "Count as"?: IOutcomeInfoBase<O>["Count as"];
  Reroll?: IMoveReroll | undefined;
  "With a Match"?: OutcomeInfoBase<O> | undefined;
  "In Control"?: boolean | undefined;
  constructor(json: IOutcomeInfoBaseYaml<O>, id: IOutcomeInfoBase<O>["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    if (json.Reroll){
      // console.log("has reroll data", json.Reroll);
      this.Reroll = {
        ...json.Reroll,
        $id: this.$id + "/Reroll",
      };
    }
    this["Count as"] = json["Count as"];
    this["In Control"] = json["In Control"];
  }
}

/**
 * @internal
 */
export class OutcomeMiss extends OutcomeInfoBase<0> implements IOutcomeMiss {
  "With a Match"?: undefined | OutcomeMissMatch;
  constructor(json: IOutcomeMissYaml, parentId: string) {
    super(json, parentId + "/Miss");
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeMissMatch(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class OutcomeMissMatch extends OutcomeMiss implements IOutcomeMissMatch {
  constructor(json:IOutcomeMissYaml, parentId: string) {
    super(json, parentId);
    this.$id +=  "/With_a_match";
  }
}
/**
 * @internal
 */
export class OutcomeWeakHit extends OutcomeInfoBase<1> implements IOutcomeWeakHit {
  "With a Match"?: undefined;
  constructor(json: IOutcomeWeakHitYaml, parentId: string) {
    super(json, parentId + "/Weak_Hit");
  }
}

/**
 * @internal
 */
export class OutcomeStrongHit extends OutcomeInfoBase<2> implements IOutcomeStrongHit {
  "With a Match"?: undefined | OutcomeStrongHitMatch;
  constructor(json: IOutcomeStrongHitYaml, parentId: string) {
    super(json, parentId + "/Strong_Hit");
    if (json["With a Match"]) {
      this["With a Match"] = new OutcomeStrongHitMatch(json["With a Match"], this.$id);
    }
  }
}
/**
 * @internal
 */
export class OutcomeStrongHitMatch extends OutcomeStrongHit implements IOutcomeStrongHitMatch {
  constructor(json:IOutcomeStrongHitMatchYaml, parentId: string) {
    super(json, parentId);
    this.$id +=  "/With_a_match";
  }
}