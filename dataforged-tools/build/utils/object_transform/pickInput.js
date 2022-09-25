import { InputClockBuilder, InputNumberBuilder, InputSelectBuilder, InputTextBuilder } from "../../builders";
import { InputType } from "../../schema";
/**
 * Infers the correct class for an YamlInput object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export function pickInput(inputJson, parent) {
    switch (inputJson["Input Type"]) {
        case InputType.Clock: {
            return new InputClockBuilder(inputJson, parent);
        }
        case InputType.Number: {
            return new InputNumberBuilder(inputJson, parent);
        }
        case InputType.Select: {
            return new InputSelectBuilder(inputJson, parent);
        }
        case InputType.Text: {
            return new InputTextBuilder(inputJson, parent);
        }
        default: {
            throw new Error("Unable to assign input data to a type - make sure it's correct.");
        }
    }
}
//# sourceMappingURL=pickInput.js.map