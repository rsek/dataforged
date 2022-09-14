import { OutcomeMiss, OutcomeStrongHit, OutcomeWeakHit } from "../index.js";
import type { IAlterMoveOutcomes, IMoveOutcomes } from "../../json_out/index.js";
import type { IAlterMoveOutcomesYaml, IMoveOutcomesYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class MoveOutcomes implements IMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit": OutcomeStrongHit;
    "Weak Hit": OutcomeWeakHit;
    "Miss": OutcomeMiss;
    constructor(json: IMoveOutcomesYaml, id: IMoveOutcomes["$id"]);
}
/**
 * @internal
 */
export declare class AlterMoveOutcomes implements IAlterMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit"?: OutcomeStrongHit | undefined;
    "Weak Hit"?: OutcomeWeakHit | undefined;
    "Miss"?: OutcomeMiss | undefined;
    constructor(json: IAlterMoveOutcomesYaml, id: IMoveOutcomes["$id"]);
}
//# sourceMappingURL=MoveOutcomes.d.ts.map