//License: MIT
import { InputClock, InputNumber, InputText } from "../../classes/common/index.js";
import { InputSelect } from "../../classes/common/InputSelect.js";
import { InputType } from "../../json_out/index.js";
/**
 * Infers the correct class for an IInputYaml object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export function pickInput(inputJson, parent) {
    switch (inputJson["Input Type"]) {
        case InputType.Clock: {
            return new InputClock(inputJson, parent);
        }
        case InputType.Number: {
            return new InputNumber(inputJson, parent);
        }
        case InputType.Select: {
            return new InputSelect(inputJson, parent);
        }
        case InputType.Text: {
            return new InputText(inputJson, parent);
        }
        default: {
            throw new Error("Unable to assign input data to a type - make sure it's correct.");
        }
    }
}
//# sourceMappingURL=pickInput.js.map