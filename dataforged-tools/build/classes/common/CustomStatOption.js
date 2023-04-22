import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class CustomStatOption {
    constructor(json, parentId) {
        this.$id = `${parentId}/${formatIdFragment(json.Name)}`;
        this.Name = json.Name;
        this.Value = json.Value;
    }
}
//# sourceMappingURL=CustomStatOption.js.map