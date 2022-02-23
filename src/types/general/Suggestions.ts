import t from 'ts-runtime/lib';

import AssetId from "../assets/AssetId";
import GameObject from '../gameobjects/GameObject';
import MoveId from "../moves/MoveId";
import OracleTableId from "../oracles/OracleTableId";
import ISuggestions from './interfaces/ISuggestions';
import ISuggestionsData from './interfaces/ISuggestionsData';

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
  constructor(data: ISuggestionsData) {
    if (data["Game objects"]) {
      console.info("[Suggestions.constructor] Game objects", JSON.stringify(data["Game objects"]));
      this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
    }
    if (data["Oracle rolls"]) {
      if (data["Oracle rolls"].some(item => !item.startsWith("Oracles /"))) {
        throw new Error(`Oracle roll references an invalid ID: ${JSON.stringify(data["Oracle rolls"])}`);
      }
      this["Oracle rolls"] = data["Oracle rolls"];
    }
    if (data.Moves) {
      this.Moves = data.Moves;
    }
    if (data.Assets) {
      this.Assets = data.Assets;
    }
  }
}
