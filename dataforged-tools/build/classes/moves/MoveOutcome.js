/**
 * @internal
 */
export class OutcomeInfo {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        if (json.Reroll) {
            console.log("has reroll data", json.Reroll);
            this.Reroll = {
                ...json.Reroll,
                $id: this.$id + "/Reroll",
            };
        }
        if (json["With a Match"]) {
            this["With a Match"] = new OutcomeInfo(json["With a Match"], (`${this.$id}/With_a_Match`));
        }
        this["In Control"] = json["In Control"];
    }
}
//# sourceMappingURL=MoveOutcome.js.map