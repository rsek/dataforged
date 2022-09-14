/**
 * @internal
 */
export class OutcomeInfoBase {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        if (json.Reroll) {
            // console.log("has reroll data", json.Reroll);
            this.Reroll = {
                ...json.Reroll,
                $id: this.$id + "/Reroll",
            };
        }
        this["Count as"] = json["Count as"];
        this["In Control"] = json["In Control"];
    }
}
/**
 * @internal
 */
export class OutcomeMiss extends OutcomeInfoBase {
    constructor(json, parentId) {
        super(json, parentId + "/Miss");
        if (json["With a Match"]) {
            this["With a Match"] = new OutcomeMissMatch(json["With a Match"], this.$id);
        }
    }
}
/**
 * @internal
 */
export class OutcomeMissMatch extends OutcomeMiss {
    constructor(json, parentId) {
        super(json, parentId);
        this.$id += "/With_a_match";
    }
}
/**
 * @internal
 */
export class OutcomeWeakHit extends OutcomeInfoBase {
    constructor(json, parentId) {
        super(json, parentId + "/Weak_Hit");
    }
}
/**
 * @internal
 */
export class OutcomeStrongHit extends OutcomeInfoBase {
    constructor(json, parentId) {
        super(json, parentId + "/Strong_Hit");
        if (json["With a Match"]) {
            this["With a Match"] = new OutcomeStrongHitMatch(json["With a Match"], this.$id);
        }
    }
}
/**
 * @internal
 */
export class OutcomeStrongHitMatch extends OutcomeStrongHit {
    constructor(json, parentId) {
        super(json, parentId);
        this.$id += "/With_a_match";
    }
}
//# sourceMappingURL=MoveOutcome.js.map