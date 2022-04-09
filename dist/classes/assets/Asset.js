import { AssetAbility } from "../../../dist/classes/assets/AssetAbility.js";
import { ConditionMeter } from "../../../dist/classes/common/ConditionMeter.js";
import { ClockInput, NumberInput, SelectInput, TextInput } from "../../../dist/classes/common/Input.js";
import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { InputType } from "../../../dist/json_out/index.js";
import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import { buildLog } from "../../../dist/utils/logging/buildLog.js";
export class Asset extends SourceInheritor {
    constructor(json, parent) {
        super(json.Source ?? {}, parent.Source);
        this["Asset Type"] = parent.$id;
        this.$id = `${this["Asset Type"]} / ${json.Name}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Display = {
            Title: json.Display?.Title ?? this.Name,
            Color: json.Display?.Color ?? parent.Display.Color
        };
        this.Attachments = json.Attachments;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => {
                const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
                switch (inputJson["Input Type"]) {
                    case InputType.Clock: {
                        return new ClockInput(inputJson, idString);
                    }
                    case InputType.Number: {
                        return new NumberInput(inputJson, idString);
                    }
                    case InputType.Select: {
                        return new SelectInput(inputJson, idString);
                    }
                    case InputType.Text: {
                        return new TextInput(inputJson, idString);
                    }
                    default: {
                        throw new Error("Unable to assign input data to a type - make sure it's correct.");
                    }
                }
            });
        }
        this.Requirement = json.Requirement;
        if (json.Abilities.length !== 3) {
            throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
        }
        this.Abilities = json.Abilities.map((ability, index) => new AssetAbility(ability, this.$id + ` / Abilities / ${index + 1}`, this));
        this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + " / Condition Meter", this["Asset Type"]) : undefined;
    }
}
//# sourceMappingURL=Asset.js.map