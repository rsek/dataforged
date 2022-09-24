import type { GameObjectRecord } from "@game_objects";
import type { YamlStub } from "@schema_yaml";
import type { Suggestions } from "@schema_json";

/**
 * @internal
 */
export interface YamlSuggestions extends YamlStub<Suggestions, "Game objects"> {
  "Game objects"?: GameObjectRecord[] | undefined;
}
