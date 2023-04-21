import type { IAlterMoveOutcomes, IMoveOutcomes, IOutcomeInfo } from "../../json_out/index.js";
import type { IAlterMoveOutcomesYaml, IMoveOutcomesYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class MoveOutcomes implements IMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit": IOutcomeInfo;
    "Weak Hit": IOutcomeInfo;
    "Miss": IOutcomeInfo;
    constructor(json: IMoveOutcomesYaml, id: IMoveOutcomes["$id"]);
}
/**
 * @internal
 */
export declare class AlterMoveOutcomes implements IAlterMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit"?: IOutcomeInfo | undefined;
    "Weak Hit"?: IOutcomeInfo | undefined;
    "Miss"?: IOutcomeInfo | undefined;
    constructor(json: IAlterMoveOutcomesYaml, id: IMoveOutcomes["$id"]);
}
//# sourceMappingURL=MoveOutcomes.d.ts.map