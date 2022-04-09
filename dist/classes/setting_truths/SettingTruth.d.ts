import { Source } from "../../../dist/classes/common/Source.js";
import { Suggestions } from "../../../dist/classes/common/Suggestions.js";
import { SettingTruthOption } from "../../../dist/classes/setting_truths/SettingTruthOption.js";
import type { ISettingTruth, ISource, ParagraphsString, SettingTruthId, SettingTruthName } from "../../../dist/json_out/index.js";
import type { ISettingTruthYaml } from "../../../dist/yaml_in/setting_truths/ISettingTruthYaml.js";
export declare class SettingTruth implements ISettingTruth {
    $id: SettingTruthId;
    Name: SettingTruthName;
    Table: SettingTruthOption[];
    Character: ParagraphsString;
    Suggestions?: Suggestions | undefined;
    Source: Source;
    constructor(json: ISettingTruthYaml, sourceJson: ISource);
}
//# sourceMappingURL=SettingTruth.d.ts.map