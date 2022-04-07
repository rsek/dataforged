import type ISettingTruth from "@dataforged/interfaces/json_out/setting_truths/ISettingTruth.js";
import type ISuggestionsYaml from "@dataforged/interfaces/yaml_in/common/ISuggestionsYaml.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";

export default interface ISettingTruthYaml extends StubExcept<ISettingTruth, "Name" | "Table" | "Character", "Suggestions"> {
  Suggestions?: ISuggestionsYaml | undefined;
}