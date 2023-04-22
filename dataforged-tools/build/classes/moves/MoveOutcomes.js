import { OutcomeInfo } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class MoveOutcomes {
    $id;
    "Strong Hit";
    "Weak Hit";
    "Miss";
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
    $id;
    "Strong Hit";
    "Weak Hit";
    "Miss";
    constructor(json, id) {
        this.$id = id;
        const keys = ["Strong Hit", "Weak Hit", "Miss"];
        keys.forEach(outcome => {
            if (json[outcome]) {
                this[outcome] = json[outcome];
                this[outcome].$id = `${this.$id}/${formatIdFragment(outcome)}`;
                if (this[outcome]?.["With a Match"]) {
                    this[outcome]["With a Match"].$id = this[outcome].$id + "/With_a_Match";
                }
            }
        });
    }
}
//# sourceMappingURL=MoveOutcomes.js.map