import _ from "lodash-es";
import { AlterMove, Move } from "@classes/index.js";
import { Replacement } from "@json_out/common/Replacement.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
/**
 * @internal
 */
export class AssetAbility {
    constructor(json, id, gamespace, parent) {
        var _a;
        /* Setting the id of the asset ability. */
        this.$id = id;
        this.Text = json.Text;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => pickInput(inputJson, this));
        }
        this.Enabled = (_a = json.Enabled) !== null && _a !== void 0 ? _a : false;
        this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove, index) => {
            const newData = new AlterMove(alterMove, this, index);
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
                    moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition Meter"].$id);
                    // console.log("asset ability move data", moveDataClone);
                }
                return new Move(moveDataClone, gamespace, parent.Source);
            });
        }
    }
}
