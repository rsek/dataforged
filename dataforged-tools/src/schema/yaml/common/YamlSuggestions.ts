import type { GameObjectRecord } from "@game_objects";
import type { Suggestions , YamlStub } from "@schema";

/**
 * @internal
 */
export interface YamlSuggestions extends YamlStub<Suggestions, "Game objects"> {
  "Game objects"?: GameObjectRecord[] | undefined;
}
