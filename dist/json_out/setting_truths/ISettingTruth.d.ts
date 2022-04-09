import type { IHasId, IHasName, IHasSource, IHasSuggestions, IHasTable, ISettingTruthOption, ISuggestions, ParagraphsString } from "@dataforged/json_out/index.js";
import type { SettingTruthId, SettingTruthName } from "./SettingTruthName";
export interface ISettingTruth extends IHasId<SettingTruthId>, IHasName<SettingTruthName>, IHasSource, Partial<IHasSuggestions<ISuggestions>>, IHasTable<ISettingTruthOption> {
    Table: ISettingTruthOption[];
    Character: ParagraphsString;
}
//# sourceMappingURL=ISettingTruth.d.ts.map