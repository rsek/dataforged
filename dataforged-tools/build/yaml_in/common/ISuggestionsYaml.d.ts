import type { GameObjectRecord } from "../../game_objects/index.js";
import type { ISuggestions } from "../../json_out/index.js";
export interface ISuggestionsYaml extends Omit<ISuggestions, "Game objects"> {
    "Game objects"?: GameObjectRecord[] | undefined;
}
//# sourceMappingURL=ISuggestionsYaml.d.ts.map