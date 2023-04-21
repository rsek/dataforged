import { AssetState } from "./AssetState.js";
import { AlterMove, Move } from "../index.js";
import { Replacement } from "../../json_out/index.js";
import { pickInput } from "../../utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "../../utils/object_transform/replaceInAllStrings.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AssetAbility {
    constructor(json, id, gamespace, parent) {
        var _a, _b;
        this.$id = id;
        this.Name = json.Name;
        this.Text = json.Text;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => pickInput(inputJson, this));
        }
        this.Enabled = (_a = json.Enabled) !== null && _a !== void 0 ? _a : false;
        this["Alter Momentum"] = json["Alter Momentum"];
        this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove, index) => {
            var _a;
            if (parent.Usage.Shared && !((_a = alterMove.Trigger) === null || _a === void 0 ? void 0 : _a.By)) {
                if (!alterMove.Trigger) {
                    alterMove.Trigger = {};
                }
                alterMove.Trigger.By = { Player: true, Ally: true };
            }
            const newData = new AlterMove(alterMove, this, index);
            return newData;
        }) : json["Alter Moves"];
        this["Alter Properties"] = json["Alter Properties"];
        if ((_b = this["Alter Properties"]) === null || _b === void 0 ? void 0 : _b.States) {
            this["Alter Properties"].States = this["Alter Properties"].States.map(state => new AssetState(state));
        }
        if (json.Moves) {
            this.Moves = json.Moves.map(moveJson => {
                var _a;
                const moveDataClone = _.cloneDeep(moveJson);
                moveDataClone.Asset = parent.$id;
                moveDataClone.$id = `${this.$id.replace("/Assets/", "/Moves/Assets/")}/${formatIdFragment(moveDataClone.Name)}`;
                moveDataClone.Category = `${gamespace}/Moves/Assets`;
                if (moveDataClone.Trigger.Options && ((_a = parent["Condition Meter"]) === null || _a === void 0 ? void 0 : _a.$id)) {
                    moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition Meter"].$id);
                    // console.log("asset ability move data", moveDataClone);
                }
                return new Move(moveDataClone, this, gamespace, parent.Source);
            });
        }
    }
}
//# sourceMappingURL=AssetAbility.js.map