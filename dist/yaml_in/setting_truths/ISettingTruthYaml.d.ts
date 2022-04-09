import type { ISettingTruth } from "../../json_out/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
import type { ISuggestionsYaml } from "../index.js";
export interface ISettingTruthYaml extends StubExcept<ISettingTruth, "Name" | "Table" | "Character", "Suggestions"> {
    Suggestions?: ISuggestionsYaml | undefined;
}
//# sourceMappingURL=ISettingTruthYaml.d.ts.map