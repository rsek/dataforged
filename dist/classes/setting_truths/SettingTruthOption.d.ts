import { Row } from "../index.js";
import type { ISettingTruthOption, ParagraphsString, SettingTruthOptionId } from "../../json_out/index.js";
export declare class SettingTruthOption extends Row implements ISettingTruthOption {
    $id: SettingTruthOptionId;
    "Quest Starter": ParagraphsString;
    Description: ParagraphsString;
    constructor(parentId: string, json: ISettingTruthOption);
}
//# sourceMappingURL=SettingTruthOption.d.ts.map