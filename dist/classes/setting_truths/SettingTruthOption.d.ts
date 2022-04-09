import { Row } from "../../../dist/classes/oracles/Row.js";
import type { ISettingTruthOption, ParagraphsString, SettingTruthOptionId } from "../../../dist/json_out/index.js";
export declare class SettingTruthOption extends Row implements ISettingTruthOption {
    $id: SettingTruthOptionId;
    "Quest Starter": ParagraphsString;
    Description: ParagraphsString;
    constructor(parentId: string, json: ISettingTruthOption);
}
//# sourceMappingURL=SettingTruthOption.d.ts.map