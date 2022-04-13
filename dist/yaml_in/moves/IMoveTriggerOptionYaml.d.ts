import type { IMoveTriggerOption, ProgressType, RollableStat, RollType } from "../../json_out/index.js";
import type { StubBy } from "../../utils/types/Stub.js";
export interface IMoveTriggerOptionYaml<T extends RollType = RollType> extends StubBy<IMoveTriggerOption<T>, "Method" | "Custom stat", "$id" | "Using"> {
    Using?: (RollableStat | ProgressType | "${{Asset_Condition_Meter}}")[] | undefined;
}
//# sourceMappingURL=IMoveTriggerOptionYaml.d.ts.map