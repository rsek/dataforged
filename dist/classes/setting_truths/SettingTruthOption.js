import { Row } from "../../../dist/classes/oracles/Row.js";
export class SettingTruthOption extends Row {
    constructor(parentId, json) {
        super(parentId, json);
        if (this.Subtable) {
            this.Subtable = this.Subtable.map(row => new Row(`${this.$id ?? "--"} / Subtable`, row));
            this.Subtable.forEach(row => row.validateRollTemplate());
        }
        this["Quest Starter"] = json["Quest Starter"];
        this["Description"] = json["Description"];
    }
}
//# sourceMappingURL=SettingTruthOption.js.map