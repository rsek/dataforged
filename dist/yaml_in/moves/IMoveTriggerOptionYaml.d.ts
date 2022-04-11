import type { IMoveTriggerOption, RollType } from "../../json_out/index.js";
import type { PartialBy } from "../../utils/types/PartialBy.js";
export interface IMoveTriggerOptionYaml<T extends RollType> extends PartialBy<IMoveTriggerOption<T>, "Method" | "$id" | "Custom stat"> {
}
//# sourceMappingURL=IMoveTriggerOptionYaml.d.ts.map