import { CustomStatOption } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class CustomStat {
    $id;
    Name;
    Options;
    constructor(json, parentId) {
        this.$id = `${parentId}/${formatIdFragment("Custom stat")}`;
        this.Name = json.Name;
        this.Options = json.Options?.map(option => new CustomStatOption(option, this.$id));
    }
}
//# sourceMappingURL=CustomStat.js.map