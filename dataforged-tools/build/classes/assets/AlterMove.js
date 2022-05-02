import { MoveTrigger } from "../index.js";
import { AlterMoveOutcomes } from "../moves/MoveOutcomes.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AlterMove {
    constructor(json, parent, index) {
        this.$id = `${parent.$id}/Alter_Moves/${index + 1}`;
        this.Alters = json.Alters;
        this.Moves = json.Moves;
        if (json.Trigger) {
            const triggerClone = _.cloneDeep(json.Trigger);
            this.Trigger = new MoveTrigger(triggerClone, `${this.$id}/Trigger`, this);
        }
        this.Text = json.Text;
        if (json.Outcomes) {
            this.Outcomes = new AlterMoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`);
        }
    }
}
//# sourceMappingURL=AlterMove.js.map