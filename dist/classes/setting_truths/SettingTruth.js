import { Source } from "../index.js";
import { Suggestions } from "../index.js";
import { SettingTruthOption } from "../index.js";
import { buildLog } from "../../utils/logging/buildLog.js";
export class SettingTruth {
    constructor(json, sourceJson) {
        var _a;
        this.$id = `Setting_Truths/${json.Name.replaceAll(" ", "_")}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
        this.Character = json.Character;
        this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
        this.Source = new Source((_a = json.Source) !== null && _a !== void 0 ? _a : {}, sourceJson);
    }
}
//# sourceMappingURL=SettingTruth.js.map