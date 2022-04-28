import { OutcomeInfo } from "../index.js";
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
//# sourceMappingURL=MoveOutcomes.js.map