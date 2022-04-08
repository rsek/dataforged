import type { ISuggestions } from "@dataforged/json_out/index.js";
import type { GameObjectYaml } from "@dataforged/yaml_in/index.js";

export interface ISuggestionsYaml extends Omit<ISuggestions, "Game objects"> {
  "Game objects"?: GameObjectYaml[] | undefined;
}
