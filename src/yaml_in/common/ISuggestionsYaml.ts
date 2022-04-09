import type { GameObjectRecord } from "@dataforged/game_objects/index.js";
import type { ISuggestions } from "@dataforged/json_out/index.js";

export interface ISuggestionsYaml extends Omit<ISuggestions, "Game objects"> {
  "Game objects"?: GameObjectRecord[] | undefined;
}
