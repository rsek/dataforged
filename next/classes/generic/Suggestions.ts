import { AssetId } from "../assets/Asset";
import { MoveId } from "../moves/Move";
import { OracleTableId } from "../oracles/OracleId";
import { IGameObject, GameObject } from "./GameObject";
/**
* Object representing "non-canon" suggestions of additional oracle tables to roll or game objects to generate. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
*
* @class Suggestions
*/
export interface ISuggestions {
  "Game objects"?: IGameObject[];
  "Oracle rolls"?: OracleTableId[];
  "Moves"?: MoveId[];
  "Assets"?: AssetId[];
}
export class Suggestions implements ISuggestions {
  "Game objects"?: GameObject[];
  "Oracle rolls"?: OracleTableId[];
  "Moves"?: AssetId[];
  "Assets"?: MoveId[];
  constructor(data: ISuggestions) {
    if (data["Game objects"]) {
      this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
    }
    if (data["Oracle rolls"]) {
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
