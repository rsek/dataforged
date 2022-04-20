import { SettingTruthOption, Source, Suggestions } from "../index.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { ISettingTruth, ISource, SettingTruthId, SettingTruthName } from "../../json_out/index.js";
import type { ISettingTruthYaml } from "../../yaml_in/setting_truths/ISettingTruthYaml.js";
/**
 * @internal
 */
export declare class SettingTruth implements ISettingTruth {
    $id: SettingTruthId;
    Name: SettingTruthName;
    Table: SettingTruthOption[];
    Character: string;
    Suggestions?: Suggestions | undefined;
    Source: Source;
    constructor(json: ISettingTruthYaml, sourceJson: ISource, gamespace: Gamespace);
}
//# sourceMappingURL=SettingTruth.d.ts.map