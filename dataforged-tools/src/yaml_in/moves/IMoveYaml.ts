import type { IMove } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";
import type { IMoveTriggerYaml } from "@yaml_in/index.js";


export interface IMoveYaml extends StubBy<IMove, "$id", "Trigger"> {
  Trigger: IMoveTriggerYaml;
}
;
