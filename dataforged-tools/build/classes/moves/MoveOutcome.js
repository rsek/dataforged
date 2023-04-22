/**
 * @internal
 */
export class OutcomeInfo {
    $id;
    Text;
    Reroll;
    "With a Match";
    "In Control";
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        this.Reroll = json.Reroll;
        if (json["With a Match"]) {
            this["With a Match"] = new OutcomeInfo(json["With a Match"], (`${this.$id}/With_a_Match`));
        }
        this["In Control"] = json["In Control"];
    }
}
//# sourceMappingURL=MoveOutcome.js.map