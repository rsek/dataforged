import AssetId from "../../assets/AssetId";
import IGameObject from "../../gameobjects/IGameObject";
import MoveId from "../../moves/MoveId";
import OracleTableId from "../../oracles/OracleTableId";
import ISuggestionsData from "./ISuggestionsData";

export default interface ISuggestions extends Omit<ISuggestionsData, "Game objects"> {
  "Game objects"?: IGameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
