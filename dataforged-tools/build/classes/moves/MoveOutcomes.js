import { OutcomeMiss, OutcomeStrongHit, OutcomeWeakHit } from "../index.js";
/**
 * @internal
 */
export class MoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        this["Strong Hit"] = new OutcomeStrongHit(json["Strong Hit"], this.$id);
        this["Weak Hit"] = new OutcomeWeakHit(json["Weak Hit"], this.$id);
        this["Miss"] = new OutcomeMiss(json["Miss"], this.$id);
    }
}
/**
 * @internal
 */
export class AlterMoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        if (json["Strong Hit"]) {
            this["Strong Hit"] = new OutcomeStrongHit(json["Strong Hit"], this.$id);
        }
        if (json["Weak Hit"]) {
            this["Weak Hit"] = new OutcomeWeakHit(json["Weak Hit"], this.$id);
        }
        if (json["Miss"]) {
            this["Miss"] = new OutcomeMiss(json["Miss"], this.$id);
        }
    }
}
//# sourceMappingURL=MoveOutcomes.js.map