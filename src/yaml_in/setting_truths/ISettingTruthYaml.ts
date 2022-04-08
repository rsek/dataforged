import type { ISettingTruth } from "@dataforged/json_out/index.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";
import type { ISuggestionsYaml } from "@dataforged/yaml_in";

export interface ISettingTruthYaml extends StubExcept<ISettingTruth, "Name" | "Table" | "Character", "Suggestions"> {
  Suggestions?: ISuggestionsYaml | undefined;
}