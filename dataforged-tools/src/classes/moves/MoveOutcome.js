/**
 * @internal
 */
export class MoveOutcome {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        if (json["With a Match"]) {
            this["With a Match"] = new MoveOutcome(json["With a Match"], `${this.$id}/With_a_Match`);
        }
    }
}
