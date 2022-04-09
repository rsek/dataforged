import { Source } from "../index.js";
import { Suggestions } from "../index.js";
import { SettingTruthOption } from "../index.js";
import type { ISettingTruth, ISource, ParagraphsString, SettingTruthId, SettingTruthName } from "../../json_out/index.js";
import type { ISettingTruthYaml } from "../../yaml_in/setting_truths/ISettingTruthYaml.js";
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