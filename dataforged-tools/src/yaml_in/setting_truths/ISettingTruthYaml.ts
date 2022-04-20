import type { ISettingTruth } from "@json_out/index.js";
import type { StubExcept } from "@utils/types/Stub.js";
import type { ISuggestionsYaml } from "@yaml_in/index.js";

export interface ISettingTruthYaml extends StubExcept<ISettingTruth, "Name" | "Table" | "Character", "Suggestions"> {
  Suggestions?: ISuggestionsYaml | undefined;
}