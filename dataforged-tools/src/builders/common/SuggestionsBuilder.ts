import { GameObjectBuilder } from "@builders";
import type { Asset , EncounterStarforged, GameObject, Move, OracleTable, Suggestions, YamlSuggestions } from "@schema";

/**
 * @internal
 */
export class SuggestionsBuilder implements Suggestions {
  "Game objects"?: GameObject[] | undefined;
  "Oracle rolls"?: OracleTable["$id"][] | undefined;
  "Assets"?: Asset["$id"][] | undefined;
  "Moves"?: Move["$id"][] | undefined;
  "Encounters"?: EncounterStarforged["$id"][] | undefined;
  constructor(data: YamlSuggestions) {
    if (data["Game objects"]) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this["Game objects"] = data["Game objects"].map(gameObjData => new GameObjectBuilder(gameObjData));
    }
    if (data["Oracle rolls"]) {
      // TODO type check against string
      this["Oracle rolls"] = data["Oracle rolls"];
    }
    if (data.Moves) {
      // TODO type check against string
      this.Moves = data.Moves;
    }
    if (data.Assets) {
      // TODO type check against string
      this.Assets = data.Assets;
    }
  }
}
