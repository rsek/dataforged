import { CustomStatOption } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class CustomStat {
    constructor(json, id) {
        this.$id = id;
        this.Name = json.Name;
        this.Options = json.Options?.map(option => new CustomStatOption(option, `${id}/${formatIdFragment(json._idFragment ?? json.Name)}`));
    }
}
//# sourceMappingURL=CustomStat.js.map