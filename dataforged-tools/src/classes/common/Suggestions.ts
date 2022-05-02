import { GameObject } from "@classes/index.js";
import type { IAsset } from "@json_out/index.js";
import type { IEncounterStarforged } from "@json_out/index.js";
import type { IMove, IOracle, ISuggestions } from "@json_out/index.js";
import type { ISuggestionsYaml } from "@yaml_in/common/ISuggestionsYaml.js";

/**
 * @internal
 */
export class Suggestions implements ISuggestions {
  "Game objects"?: GameObject[] | undefined;
  "Oracle rolls"?: IOracle["$id"][] | undefined;
  "Assets"?: IAsset["$id"][] | undefined;
  "Moves"?: IMove["$id"][] | undefined;
  "Encounters"?: IEncounterStarforged["$id"][] | undefined;
  constructor(data: ISuggestionsYaml) {
    if (data["Game objects"]) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
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
