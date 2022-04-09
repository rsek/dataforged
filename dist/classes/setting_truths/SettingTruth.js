import { Source } from "../../../dist/classes/common/Source.js";
import { Suggestions } from "../../../dist/classes/common/Suggestions.js";
import { SettingTruthOption } from "../../../dist/classes/setting_truths/SettingTruthOption.js";
import { buildLog } from "../../../dist/utils/logging/buildLog.js";
export class SettingTruth {
    constructor(json, sourceJson) {
        this.$id = `Setting Truths / ${json.Name}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
        this.Character = json.Character;
        this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
        this.Source = new Source(json.Source ?? {}, sourceJson);
    }
}
//# sourceMappingURL=SettingTruth.js.map