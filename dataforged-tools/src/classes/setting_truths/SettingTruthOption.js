import { Row } from "@classes/index.js";
/**
 * @internal
 */
export class SettingTruthOption extends Row {
    constructor(parentId, json) {
        super(parentId, json);
        this["Description"] = json["Description"];
        this["Quest Starter"] = json["Quest Starter"];
        if (this.Subtable) {
            // what is happening here?
            this.Subtable = this.Subtable.map(row => { var _a; return new Row(`${(_a = this.$id) !== null && _a !== void 0 ? _a : "--"}/Subtable`.replaceAll(" ", "_"), row); });
            this.Subtable.forEach(row => row.validateRollTemplate());
        }
    }
}
