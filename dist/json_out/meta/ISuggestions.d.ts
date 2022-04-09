import type { AssetId, EncounterId, IGameObject, MoveId, OracleTableId } from "../index.js";
export interface ISuggestions {
    "Game objects"?: IGameObject[] | undefined;
    "Oracle rolls"?: OracleTableId[] | undefined;
    "Moves"?: MoveId[] | undefined;
    "Assets"?: AssetId[] | undefined;
    "Encounters"?: EncounterId[] | undefined;
}
//# sourceMappingURL=ISuggestions.d.ts.map