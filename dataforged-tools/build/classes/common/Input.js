import { ClockType } from "../../json_out/common/index.js";
/**
 * @internal
 */
export class Input {
    constructor(json, parent) {
        this.$id = `${parent.$id}/Inputs/${json.Name}`;
        this.Name = json.Name;
        this["Input Type"] = json["Input Type"];
    }
}
/**
 * @internal
 */
export class InputNumber extends Input {
    constructor(json, parent) {
        var _a, _b, _c;
        super(json, parent);
        this.Step = 1;
        this.Min = (_a = json.Min) !== null && _a !== void 0 ? _a : 0;
        this.Max = json.Max;
        this.Value = (_b = json.Value) !== null && _b !== void 0 ? _b : 0;
        this.Adjustable = (_c = json.Adjustable) !== null && _c !== void 0 ? _c : true;
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