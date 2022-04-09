import type { ISettingTruth } from "@dataforged/json_out/index.js";
import type { StubExcept } from "../../../dist/utils/types/Stub.js";
import type { ISuggestionsYaml } from "./..";
export interface ISettingTruthYaml extends StubExcept<ISettingTruth, "Name" | "Table" | "Character", "Suggestions"> {
    Suggestions?: ISuggestionsYaml | undefined;
}
//# sourceMappingURL=ISettingTruthYaml.d.ts.map