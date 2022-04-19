"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputText = exports.InputClock = exports.InputNumber = exports.Input = void 0;
const index_js_1 = require("../../json_out/common/index.js");
/**
 * @internal
 */
class Input {
    constructor(json, parent) {
        this.$id = `${parent.$id}/Inputs/${json.Name}`;
        this.Name = json.Name;
        this["Input Type"] = json["Input Type"];
    }
}
exports.Input = Input;
/**
 * @internal
 */
class InputNumber extends Input {
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
exports.InputNumber = InputNumber;
/**
 * @internal
 */
class InputClock extends Input {
    constructor(json, parent) {
        var _a, _b;
        super(json, parent);
        this["Clock Type"] = index_js_1.ClockType.Tension;
        this.Segments = json.Segments;
        this.Filled = (_a = json.Filled) !== null && _a !== void 0 ? _a : 0;
        // TODO: validate number range - maybe with decorators?
        this.Adjustable = (_b = json.Adjustable) !== null && _b !== void 0 ? _b : true;
    }
}
exports.InputClock = InputClock;
/**
 * @internal
 */
class InputText extends Input {
    constructor(json, parent) {
        var _a;
        super(json, parent);
        this.Adjustable = (_a = json.Adjustable) !== null && _a !== void 0 ? _a : false;
    }
}
exports.InputText = InputText;
//# sourceMappingURL=Input.js.map