import type AssetId from "../../assets/AssetId.js";
import type GameObjectData from "../../gameObjects/GameObjectYaml.js";
import type MoveId from "../../moves/MoveId.js";
import type OracleTableId from "../../oracles/OracleTableId.js";

export default interface ISuggestionsYaml {
  "Game objects"?: GameObjectData[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Moves"?: MoveId[] | undefined;
  "Assets"?: AssetId[] | undefined;
  "Encounters"?: string[] | undefined;
}
