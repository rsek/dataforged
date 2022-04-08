import GameObject from "@dataforged/classes/oracles/GameObject.js";
import type { ISuggestions } from "@dataforged/interfaces/json_out/common/ISuggestions.js";
import type { EncounterId } from "@dataforged/interfaces/json_out/encounters/strings/EncounterId.js";
import type { AssetId, OracleTableId } from "@dataforged/interfaces/json_out/index.js";

import type { MoveId } from "@dataforged/interfaces/json_out/moves/strings/MoveId.js";
import type ISuggestionsYaml from "@dataforged/interfaces/yaml_in/common/ISuggestionsYaml.js";

/**
 * Object representing "non-canon" suggestions for related Starforged game content. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
 */
export default class Suggestions implements ISuggestions {
  "Game objects"?: GameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Encounters"?: EncounterId[] | undefined;
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
