import { MoveTriggerOptionAction, MoveTriggerOptionProgress } from "./MoveTriggerOption.js";
import { RollType } from "../../json_out/index.js";
// TODO: add ironsworn moves, or have the constructor use move data to figure it out
const progressMoves = ["Fulfill_Your_Vow", "Forge_a_Bond", "Finish_an_Expedition", "Take_Decisive_Action", "Overcome_Destruction", "Continue_a_Legacy", "Finish_the_Scene", "Reach_Your_Destination", "Write_Your_Epilogue"];
/**
 * @internal
 */
export class MoveTrigger {
    constructor(json, id, parent) {
        var _a, _b, _c;
        this.$id = id;
        this.Text = json.Text;
        if (this.$id.includes("Alter_Moves")) {
            this.By = (_a = json.By) !== null && _a !== void 0 ? _a : { Player: true, Ally: false };
        }
        if (json.Options) {
            let progressMove = false;
            if ((_b = parent["Progress Move"]) !== null && _b !== void 0 ? _b : (_c = parent.Moves) === null || _c === void 0 ? void 0 : _c.some(item => progressMoves.includes(item))) {
                progressMove = true;
            }
            this["Options"] = json.Options.map((option, index) => {
                var _a;
                if (!option["Roll type"]) {
                    option["Roll type"] = progressMove ? RollType.Progress : RollType.Action;
                }
                if (!progressMove && ((_a = parent.Moves) === null || _a === void 0 ? void 0 : _a.some(item => progressMoves.includes(item)))) {
                    throw Error("References a progress move, but isn't set to 'Progress roll'");
                }
                switch (option["Roll type"]) {
                    case RollType.Action:
                        return new MoveTriggerOptionAction(option, this, index);
                    case RollType.Progress:
                        return new MoveTriggerOptionProgress(option, this, index);
                    default:
                        throw Error(`Unrecognized roll type in: ${JSON.stringify(option)}`);
                }
            });
        }
    }
}
//# sourceMappingURL=MoveTrigger.js.map