import type { IAlterMove } from "../../json_out/index.js";
import type { IMoveTriggerYaml } from "../moves/IMoveTriggerYaml.js";
export interface IAlterMoveYaml extends Omit<IAlterMove, "$id" | "Trigger"> {
    Trigger: IMoveTriggerYaml;
}
//# sourceMappingURL=IAlterMoveYaml.d.ts.map