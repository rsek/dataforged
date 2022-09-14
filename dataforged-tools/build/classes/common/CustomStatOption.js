import { formatIdFragment } from "../../utils/formatIdFragment.js";
/**
 * @internal
 */
export class CustomStatOption {
    constructor(json, parentId) {
        this.$id = `${parentId}/${formatIdFragment(json.Label)}`;
        this.Label = json.Label;
        this.Value = json.Value;
    }
}
//# sourceMappingURL=CustomStatOption.js.map