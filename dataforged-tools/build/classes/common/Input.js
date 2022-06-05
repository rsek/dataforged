import { ClockType } from "../../json_out/index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class Input {
    constructor(json, parent) {
        this["Input Type"] = json["Input Type"];
        this.$id = `${parent.$id}/Inputs/${formatIdFragment(json.Name)}`;
        this.Name = json.Name;
        this["Input Type"] = json["Input Type"];
    }
}
/**
 * @internal
 */
export class InputNumber extends Input {
    constructor(json, parent) {
        super(json, parent);
        this.Step = 1;
        this.Min = json.Min ?? 0;
        this.Max = json.Max ?? null;
        this.Value = json.Value ?? 0;
        this.Adjustable = json.Adjustable ?? true;
    }
}
/**
 * @internal
 */
export class InputClock extends Input {
    constructor(json, parent) {
        super(json, parent);
        this["Clock Type"] = ClockType.Tension;
        this.Segments = json.Segments;
        this.Filled = json.Filled ?? 0;
        // TODO: validate number range - maybe with decorators?
        this.Adjustable = json.Adjustable ?? true;
    }
}
/**
 * @internal
 */
export class InputText extends Input {
    constructor(json, parent) {
        super(json, parent);
        this.Adjustable = json.Adjustable ?? false;
    }
}
//# sourceMappingURL=Input.js.map