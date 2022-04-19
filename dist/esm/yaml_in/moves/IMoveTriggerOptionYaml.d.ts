import type { Replacement } from "../../json_out/common/Replacement.js";
import type { IMoveTriggerOption, ProgressType, RollableStat, RollType } from "../../json_out/index.js";
import type { StubBy } from "../../utils/types/Stub.js";
export interface IMoveTriggerOptionYaml<T extends RollType = RollType> extends StubBy<IMoveTriggerOption<T>, "Method" | "Custom stat", "$id" | "Using"> {
    Using?: (RollableStat | ProgressType | Replacement.AssetMeter)[] | undefined;
}
//# sourceMappingURL=IMoveTriggerOptionYaml.d.ts.map