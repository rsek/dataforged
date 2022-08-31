import { CustomStatOption } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class CustomStat {
    constructor(json, parentId) {
        this.$id = `${parentId}/${formatIdFragment("Custom stat")}`;
        this.Label = json.Label;
        this.Options = json.Options?.map(option => new CustomStatOption(option, this.$id));
    }
}
//# sourceMappingURL=CustomStat.js.map