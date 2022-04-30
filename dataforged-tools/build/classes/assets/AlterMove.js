import { MoveTrigger } from "../index.js";
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
            this.Trigger = new MoveTrigger(triggerClone, (`${this.$id}/Trigger`));
        }
    }
}
//# sourceMappingURL=AlterMove.js.map