import AssetId from "../../assets/AssetId";
import IGameObject from "../../gameObjects/IGameObject";
import MoveId from "../../moves/MoveId";
import OracleTableId from "../../oracles/OracleTableId";
import ISuggestionsYaml from "./ISuggestionsYaml";

export default interface ISuggestions extends Omit<ISuggestionsYaml, "Game objects"> {
  "Game objects"?: IGameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
