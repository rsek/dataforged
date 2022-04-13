import { AlterMove, ClockInput, Move, NumberInput, SelectInput, TextInput } from "../index.js";
import { InputType } from "../../json_out/index.js";
import { replaceInAllStrings } from "../../utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AssetAbility {
    constructor(json, id, gamespace, parent) {
        var _a;
        this.$id = id;
        this.Text = json.Text;
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
        this.Enabled = (_a = json.Enabled) !== null && _a !== void 0 ? _a : false;
        this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove) => {
            const newData = new AlterMove(alterMove, this, parent, gamespace);
            return newData;
        }) : json["Alter Moves"];
        this["Alter Properties"] = json["Alter Properties"];
        if (json.Moves) {
            this.Moves = json.Moves.map(moveJson => {
                var _a;
                const moveDataClone = _.cloneDeep(moveJson);
                moveDataClone.Asset = parent.$id;
                moveDataClone.$id = `${this.$id.replace("/Assets/", "/Moves/Assets/")}/${moveDataClone.Name.replaceAll(" ", "_")}`;
                moveDataClone.Category = `${gamespace}/Moves/Assets`;
                if (moveDataClone.Trigger.Options && ((_a = parent["Condition Meter"]) === null || _a === void 0 ? void 0 : _a.$id)) {
                    moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, "${{Asset_Condition_Meter}}", parent["Condition Meter"].$id);
                    // console.log("asset ability move data", moveDataClone);
                }
                return new Move(moveDataClone, gamespace, parent.Source);
            });
        }
    }
}
//# sourceMappingURL=AssetAbility.js.map