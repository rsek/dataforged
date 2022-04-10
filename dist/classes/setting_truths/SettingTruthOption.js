import { Row } from "../index.js";
export class SettingTruthOption extends Row {
    constructor(parentId, json) {
        super(parentId, json);
        if (this.Subtable) {
            this.Subtable = this.Subtable.map(row => new Row(`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_"), row));
            this.Subtable.forEach(row => row.validateRollTemplate());
        }
        this["Quest Starter"] = json["Quest Starter"];
        this["Description"] = json["Description"];
    }
}
//# sourceMappingURL=SettingTruthOption.js.map