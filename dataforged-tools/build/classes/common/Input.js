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
        var _a, _b, _c, _d;
        super(json, parent);
        this.Step = 1;
        this.Min = (_a = json.Min) !== null && _a !== void 0 ? _a : 0;
        this.Max = (_b = json.Max) !== null && _b !== void 0 ? _b : null;
        this.Value = (_c = json.Value) !== null && _c !== void 0 ? _c : 0;
        this.Adjustable = (_d = json.Adjustable) !== null && _d !== void 0 ? _d : true;
    }
}
/**
 * @internal
 */
export class InputClock extends Input {
    constructor(json, parent) {
        var _a, _b;
        super(json, parent);
        this["Clock Type"] = ClockType.Tension;
        this.Segments = json.Segments;
        this.Filled = (_a = json.Filled) !== null && _a !== void 0 ? _a : 0;
        // TODO: validate number range - maybe with decorators?
        this.Adjustable = (_b = json.Adjustable) !== null && _b !== void 0 ? _b : true;
    }
}
/**
 * @internal
 */
export class InputText extends Input {
    constructor(json, parent) {
        var _a;
        super(json, parent);
        this.Adjustable = (_a = json.Adjustable) !== null && _a !== void 0 ? _a : false;
    }
}
//# sourceMappingURL=Input.js.map