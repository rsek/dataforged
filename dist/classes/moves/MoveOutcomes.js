import { MoveOutcome } from "../index.js";
export class MoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        this["Strong Hit"] = new MoveOutcome(json["Strong Hit"], `${this.$id} / Strong Hit`);
        this["Weak Hit"] = new MoveOutcome(json["Weak Hit"], `${this.$id} / Weak Hit`);
        this["Miss"] = new MoveOutcome(json["Miss"], `${this.$id} / Miss`);
    }
}
//# sourceMappingURL=MoveOutcomes.js.map