import { InputType } from "../../json_out/common/InputType.js";
import { ClockType } from "../../json_out/index.js";
import { is } from "typescript-is";
export class NumberInput {
    constructor(json, id) {
        this.Min = 0;
        this.Step = 1;
        this["Starting Value"] = 0;
        this.Adjustable = true;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class ClockInput {
    constructor(json, id) {
        this["Input Type"] = InputType.Clock;
        this["Clock Type"] = ClockType.Tension;
        this.Filled = 0;
        this.Adjustable = true;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class TextInput {
    constructor(json, id) {
        this.Adjustable = false;
        this.$id = id;
        Object.assign(this, json);
    }
}
export class SelectInput {
    constructor(json, id) {
        this.Adjustable = false;
        this.$id = id;
        this.Name = json.Name;
        this["Input Type"] = json["Input Type"];
        this.Options = json.Options.map(optionJson => {
            let option;
            if (is(optionJson)) {
                option = new AssetSelectInputStatOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else if (is(optionJson)) {
                option = new SelectInputMeterOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else if (is(optionJson)) {
                option = new SelectInputCustomOption(optionJson, `${this.$id} / Options / ${optionJson.Name}`);
            }
            else {
                throw new Error("Unable to construct select input options - check the data!");
            }
            return option;
        });
        this.Adjustable = json.Adjustable ?? false;
    }
}
export class AssetSelectInputStatOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
export class SelectInputMeterOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
class SelectInputCustomOption {
    constructor(json, id) {
        this.$id = id;
        Object.assign(this, json);
    }
}
//# sourceMappingURL=Input.js.map