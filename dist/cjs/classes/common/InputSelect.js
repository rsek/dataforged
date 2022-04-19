"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSelectOptionSetter = exports.InputSelectOption = exports.InputSelect = void 0;
const Input_js_1 = require("./Input.js");
const InputType_js_1 = require("../../json_out/common/InputType.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
/**
 * @internal
 */
class InputSelect extends Input_js_1.Input {
    constructor(json, parent) {
        var _a;
        super(json, parent);
        if (json["Input Type"] !== InputType_js_1.InputType.Select) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, json["Input Type"], "Expected InputType.Select!");
        }
        this.Adjustable = (_a = json.Adjustable) !== null && _a !== void 0 ? _a : false;
        this.Sets = json.Sets;
        this.Options = json.Options.map(optionJson => new InputSelectOption(optionJson, this));
        // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
    }
}
exports.InputSelect = InputSelect;
/**
 * @internal
 */
class InputSelectOption {
    constructor(json, parent) {
        this.$id = `${parent.$id}/Options/${json.Name.replace(" ", "_")}`;
        this.Name = json.Name;
        this.Set = json.Set.map(attr => new InputSelectOptionSetter(attr, this));
    }
}
exports.InputSelectOption = InputSelectOption;
/**
 * @internal
 */
class InputSelectOptionSetter {
    constructor(json, parent) {
        this.$id = `${parent.$id}/${json.Key.replace(" ", "_")}`;
        this.Key = json.Key;
        this.Value = json.Value;
    }
}
exports.InputSelectOptionSetter = InputSelectOptionSetter;
//# sourceMappingURL=InputSelect.js.map