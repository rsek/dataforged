import { MoveTrigger } from "../index.js";
export class AlterMove {
    constructor(json, id) {
        this.$id = id;
        this.Move = json.Move;
        this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    }
}
//# sourceMappingURL=AlterMove.js.map