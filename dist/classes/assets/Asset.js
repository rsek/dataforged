import { AssetAbility } from "./AssetAbility.js";
import { ClockInput, ConditionMeter, NumberInput, SelectInput, SourceInheritor, TextInput } from "../common/index.js";
import { InputType } from "../../json_out/common/index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { buildLog } from "../../utils/logging/buildLog.js";
/**
 * @internal
 */
export class Asset extends SourceInheritor {
    constructor(json, gamespace, parent) {
        var _a, _b, _c, _d, _e;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, parent.Source);
        this["Asset Type"] = parent.$id;
        this.$id = `${this["Asset Type"]}/${json.Name}`.replaceAll(" ", "_");
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Display = {
            Title: (_c = (_b = json.Display) === null || _b === void 0 ? void 0 : _b.Title) !== null && _c !== void 0 ? _c : this.Name,
            Color: (_e = (_d = json.Display) === null || _d === void 0 ? void 0 : _d.Color) !== null && _e !== void 0 ? _e : parent.Display.Color
        };
        this.Attachments = json.Attachments;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => {
                const idString = `${this.$id}/Inputs/${inputJson.Name}`.replaceAll(" ", "_");
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
        this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
        this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbility(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this));
    }
}
//# sourceMappingURL=Asset.js.map