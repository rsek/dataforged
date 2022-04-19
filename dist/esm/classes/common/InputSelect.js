import { Input } from "./Input.js";
import { InputType } from "../../json_out/common/InputType.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
/**
 * @internal
 */
export class InputSelect extends Input {
    constructor(json, parent) {
        var _a;
        super(json, parent);
        if (json["Input Type"] !== InputType.Select) {
            throw badJsonError(this.constructor, json["Input Type"], "Expected InputType.Select!");
        }
        this.Adjustable = (_a = json.Adjustable) !== null && _a !== void 0 ? _a : false;
        this.Sets = json.Sets;
        this.Options = json.Options.map(optionJson => new InputSelectOption(optionJson, this));
        // TODO: typecheck "Sets" vs the options - via a method that can be invoked?
    }
}
/**
 * @internal
 */
export class InputSelectOption {
    constructor(json, parent) {
        this.$id = `${parent.$id}/Options/${json.Name.replace(" ", "_")}`;
        this.Name = json.Name;
        this.Set = json.Set.map(attr => new InputSelectOptionSetter(attr, this));
    }
}
/**
 * @internal
 */
export class InputSelectOptionSetter {
    constructor(json, parent) {
        this.$id = `${parent.$id}/${json.Key.replace(" ", "_")}`;
        this.Key = json.Key;
        this.Value = json.Value;
    }
}
//# sourceMappingURL=InputSelect.js.map