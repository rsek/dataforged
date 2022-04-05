

import type ISuggestions from "./interfaces/ISuggestions.js";
import type ISuggestionsYaml from "./interfaces/ISuggestionsYaml.js";
import type AssetId from "../assets/AssetId.js";
import type EncounterId from "../encounters/EncounterId.js";
import GameObject from "../gameObjects/GameObject.js";
import type MoveId from "../moves/MoveId.js";
import type OracleTableId from "../oracles/OracleTableId.js";

/**
 * Object representing "non-canon" suggestions for related Starforged game content. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
 * @date 4/4/2022 - 10:05:46 PM
 *
 * @export
 * @class Suggestions
 * @typedef {Suggestions}
 * @implements {ISuggestions}
 */
export default class Suggestions implements ISuggestions {
  /**
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @type {?(GameObject[] | undefined)}
   */
  "Game objects"?: GameObject[] | undefined;
  /**
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @type {?(AssetId[] | undefined)}
   */
  "Assets"?: AssetId[] | undefined;
  /**
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @type {?(MoveId[] | undefined)}
   */
  "Moves"?: MoveId[] | undefined;
  /**
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @type {?(EncounterId[] | undefined)}
   */
  "Encounters"?: EncounterId[] | undefined;
  /**
   * Creates an instance of Suggestions.
   * @date 4/4/2022 - 10:05:46 PM
   *
   * @constructor
   * @param {ISuggestionsYaml} data
   */
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
