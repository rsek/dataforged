

import type ISuggestions from "./interfaces/ISuggestions.js";
import type ISuggestionsYaml from "./interfaces/ISuggestionsYaml.js";
import type AssetId from "../assets/AssetId.js";
import GameObject from "../gameObjects/GameObject.js";
import type MoveId from "../moves/MoveId.js";
import type OracleTableId from "../oracles/OracleTableId.js";

/**
* Object representing "non-canon" suggestions of additional oracle tables to roll or game objects to generate. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
*
* @class Suggestions
*/

export default class Suggestions implements ISuggestions {
  "Game objects"?: GameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Encounters"?: string[] | undefined;
  constructor(data: ISuggestionsYaml) {
    if (data["Game objects"]) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
    }
    if (data["Oracle rolls"]) {
      // TODO typecheck against string
      this["Oracle rolls"] = data["Oracle rolls"];
    }
    if (data.Moves) {
      // TODO typecheck against string
      this.Moves = data.Moves;
    }
    if (data.Assets) {
      // TODO typecheck against string
      this.Assets = data.Assets;
    }
  }
}
