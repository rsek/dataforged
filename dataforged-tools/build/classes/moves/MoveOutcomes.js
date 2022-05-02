import { OutcomeInfo } from "../index.js";
import { MoveOutcome } from "../../json_out/index.js";
import { toIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class MoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        this["Strong Hit"] = new OutcomeInfo(json["Strong Hit"], `${this.$id}/Strong_Hit`);
        this["Weak Hit"] = new OutcomeInfo(json["Weak Hit"], `${this.$id}/Weak_Hit`);
        this["Miss"] = new OutcomeInfo(json["Miss"], `${this.$id}/Miss`);
    }
}
/**
 * @internal
 */
export class AlterMoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        const keys = [MoveOutcome.Strong_Hit, MoveOutcome.Weak_Hit, MoveOutcome.Miss];
        keys.forEach(outcome => {
            var _a;
            if (json[outcome]) {
                this[outcome] = json[outcome];
                this[outcome].$id = `${this.$id}/${toIdFragment(outcome)}`;
                if ((_a = this[outcome]) === null || _a === void 0 ? void 0 : _a["With a Match"]) {
                    this[outcome]["With a Match"].$id = this[outcome].$id + "/With_a_Match";
                }
            }
        });
    }
}
//# sourceMappingURL=MoveOutcomes.js.map