"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickInput = void 0;
const index_js_1 = require("../../classes/common/index.js");
const InputSelect_js_1 = require("../../classes/common/InputSelect.js");
const index_js_2 = require("../../json_out/index.js");
/**
 * Infers the correct class for an IInputYaml object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
function pickInput(inputJson, parent) {
    switch (inputJson["Input Type"]) {
        case index_js_2.InputType.Clock: {
            return new index_js_1.InputClock(inputJson, parent);
        }
        case index_js_2.InputType.Number: {
            return new index_js_1.InputNumber(inputJson, parent);
        }
        case index_js_2.InputType.Select: {
            return new InputSelect_js_1.InputSelect(inputJson, parent);
        }
        case index_js_2.InputType.Text: {
            return new index_js_1.InputText(inputJson, parent);
        }
        default: {
            throw new Error("Unable to assign input data to a type - make sure it's correct.");
        }
    }
}
exports.pickInput = pickInput;
//# sourceMappingURL=pickInput.js.map