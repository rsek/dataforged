/**
 * @internal
 */
export class OutcomeInfo {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        this.Reroll = json.Reroll;
        if (json["With a Match"]) {
            this["With a Match"] = new OutcomeInfo(json["With a Match"], `${this.$id}/With_a_Match`);
        }
    }
}
//# sourceMappingURL=MoveOutcome.js.map