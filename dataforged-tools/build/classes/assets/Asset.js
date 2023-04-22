import { AssetAbility } from "./AssetAbility.js";
import { AssetState } from "./AssetState.js";
import { ConditionMeter } from "../common/ConditionMeter.js";
import { DisplayWithTitle } from "../common/Display.js";
import { SourceInheritor } from "../common/SourceInheritor.js";
import { InputSelectOptionType, InputType, Replacement } from "../../json_out/index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { buildLog } from "../../utils/logging/buildLog.js";
import { pickInput } from "../../utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "../../utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class Asset extends SourceInheritor {
    $id;
    Name;
    States;
    Aliases;
    "Asset Type";
    Display;
    Usage;
    Attachments;
    Requirement;
    Inputs;
    Abilities;
    "Condition Meter";
    constructor(json, gamespace, parent, rootSource) {
        // uses RootSource as a starting point because category info has page numbers in the rulebook, rather than the asset pdf
        super(json.Source ?? {}, rootSource);
        // console.log(this.Source);
        this["Asset Type"] = parent.$id;
        this.$id = `${this["Asset Type"]}/${json.Name}`.replaceAll(" ", "_");
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Display = new DisplayWithTitle({
            Title: json.Display?.Title ?? this.Name,
            Icon: json.Display?.Icon,
            Color: json.Display?.Color ?? parent.Display.Color
        });
        this.Usage = {
            Shared: ["Command Vehicle", "Support Vehicle", "Module"].includes(parent.Name) ? true : false
        };
        this.Attachments = json.Attachments;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => {
                const result = pickInput(inputJson, this);
                if (result["Input Type"] === InputType.Select) {
                    result.Sets.forEach(hint => {
                        let searchValue = undefined;
                        let replaceValue = this.$id;
                        switch (hint.Type) {
                            case InputSelectOptionType.ConditionMeter:
                                searchValue = Replacement.AssetSelectMeter;
                                replaceValue = this.$id;
                                break;
                            case InputSelectOptionType.Stat:
                                searchValue = Replacement.AssetSelectStat;
                                replaceValue = this.$id;
                                break;
                            default:
                                break;
                        }
                        if (searchValue) {
                            json.Abilities = replaceInAllStrings(json.Abilities, searchValue, replaceValue);
                        }
                    });
                }
                return result;
            });
        }
        if (json.States) {
            this.States = json.States.map(state => new AssetState(state)) ?? undefined;
        }
        this.Requirement = json.Requirement;
        this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
        if (json.Abilities.length !== 3) {
            throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
        }
        else {
            this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbility(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this));
        }
        _.merge(this, replaceInAllStrings(this, Replacement.Asset, this.$id));
        if (this["Condition Meter"]) {
            _.merge(this, replaceInAllStrings(this, Replacement.AssetMeter, this["Condition Meter"].$id));
        }
    }
}
//# sourceMappingURL=Asset.js.map