import type ISuggestionsYaml from "./ISuggestionsYaml.js";
import type AssetId from "../../assets/AssetId.js";
import type IGameObject from "../../gameObjects/IGameObject.js";
import type MoveId from "../../moves/MoveId.js";
import type OracleTableId from "../../oracles/OracleTableId.js";

export default interface ISuggestions extends Omit<ISuggestionsYaml, "Game objects"> {
  "Game objects"?: IGameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
