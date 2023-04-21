import { CustomStatOption } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class CustomStat {
    constructor(json, id) {
        var _a;
        this.$id = id;
        this.Name = json.Name;
        this.Options = (_a = json.Options) === null || _a === void 0 ? void 0 : _a.map(option => new CustomStatOption(option, `${id}/${formatIdFragment(option.Name)}`));
    }
}
//# sourceMappingURL=CustomStat.js.map