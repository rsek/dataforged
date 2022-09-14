import type { IMoveReroll, IOutcomeInfoBase, IOutcomeMiss, IOutcomeMissMatch, IOutcomeStrongHit, IOutcomeStrongHitMatch, IOutcomeWeakHit, MoveOutcome } from "../../json_out/index.js";
import type { IOutcomeInfoBaseYaml, IOutcomeMissYaml, IOutcomeStrongHitMatchYaml, IOutcomeStrongHitYaml, IOutcomeWeakHitYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class OutcomeInfoBase<O extends MoveOutcome> implements IOutcomeInfoBase<O> {
    $id: IOutcomeInfoBase<O>["$id"];
    Text: string;
    "Count as"?: IOutcomeInfoBase<O>["Count as"];
    Reroll?: IMoveReroll | undefined;
    "With a Match"?: OutcomeInfoBase<O> | undefined;
    "In Control"?: boolean | undefined;
    constructor(json: IOutcomeInfoBaseYaml<O>, id: IOutcomeInfoBase<O>["$id"]);
}
/**
 * @internal
 */
export declare class OutcomeMiss extends OutcomeInfoBase<0> implements IOutcomeMiss {
    "With a Match"?: undefined | OutcomeMissMatch;
    constructor(json: IOutcomeMissYaml, parentId: string);
}
/**
 * @internal
 */
export declare class OutcomeMissMatch extends OutcomeMiss implements IOutcomeMissMatch {
    constructor(json: IOutcomeMissYaml, parentId: string);
}
/**
 * @internal
 */
export declare class OutcomeWeakHit extends OutcomeInfoBase<1> implements IOutcomeWeakHit {
    "With a Match"?: undefined;
    constructor(json: IOutcomeWeakHitYaml, parentId: string);
}
/**
 * @internal
 */
export declare class OutcomeStrongHit extends OutcomeInfoBase<2> implements IOutcomeStrongHit {
    "With a Match"?: undefined | OutcomeStrongHitMatch;
    constructor(json: IOutcomeStrongHitYaml, parentId: string);
}
/**
 * @internal
 */
export declare class OutcomeStrongHitMatch extends OutcomeStrongHit implements IOutcomeStrongHitMatch {
    constructor(json: IOutcomeStrongHitMatchYaml, parentId: string);
}
//# sourceMappingURL=MoveOutcome.d.ts.map