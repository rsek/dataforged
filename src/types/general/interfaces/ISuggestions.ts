import AssetId from "../../assets/AssetId";
import GameObject from "../../gameobjects/GameObject";
import MoveId from "../../moves/MoveId";
import OracleTableId from "../../oracles/OracleTableId";
import ISuggestionsData from "./ISuggestionsData";

export default interface ISuggestions extends Omit<ISuggestionsData, "Game objects"> {
  "Game objects"?: GameObject[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
