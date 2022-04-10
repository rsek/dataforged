import { AlterMove, ClockInput, Move, NumberInput, SelectInput, TextInput } from "../index.js";
import { InputType } from "../../json_out/index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import _ from "lodash-es";
export class AssetAbility {
    constructor(json, id, parent) {
        var _a;
        this.$id = id;
        this.Text = json.Text;
        if (json.Moves) {
            if (!Array.isArray(json.Moves)) {
                throw badJsonError(this.constructor, json, "Moves is not an array.");
            }
            this.Moves = json.Moves.map(mv => {
                const moveData = _.cloneDeep(mv);
                moveData.$id = `Moves/${this.$id}/${mv.Name}`.replaceAll(" ", "_");
                moveData.Asset = parent.$id;
                moveData.Category = "Moves/Assets";
                return new Move(moveData, parent.Source);
            });
        }
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
        this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove) => {
            var _a;
            const moveId = (_a = alterMove.Move) !== null && _a !== void 0 ? _a : "Moves/*";
            const newData = new AlterMove(alterMove, `${this.$id}/Alter_${moveId}`.replaceAll(" ", "_"));
            return newData;
        }) : json["Alter Moves"];
        this["Alter Properties"] = json["Alter Properties"];
        this.Enabled = (_a = json.Enabled) !== null && _a !== void 0 ? _a : false;
    }
}
//# sourceMappingURL=AssetAbility.js.map