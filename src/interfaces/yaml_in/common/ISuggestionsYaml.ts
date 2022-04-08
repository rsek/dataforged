import type { ISuggestions } from "@dataforged/interfaces/json_out/common/ISuggestions.js";
import type GameObjectYaml from "@dataforged/interfaces/yaml_in/game_objects/GameObjectYaml.js";

export default interface ISuggestionsYaml extends Omit<ISuggestions, "Game objects"> {
  "Game objects"?: GameObjectYaml[] | undefined;
}
