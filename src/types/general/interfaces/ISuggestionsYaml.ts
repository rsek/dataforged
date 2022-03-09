import AssetId from "../../assets/AssetId";
import GameObjectData from "../../gameObjects/GameObjectYaml";
import MoveId from "../../moves/MoveId";
import OracleTableId from "../../oracles/OracleTableId";


export default interface ISuggestionsYaml {
  "Game objects"?: GameObjectData[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
