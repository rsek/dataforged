import { GameObject } from "../index.js";
import type { AssetId, EncounterId, ISuggestions, MoveId, OracleTableId } from "../../json_out/index.js";
import type { ISuggestionsYaml } from "../../yaml_in/common/ISuggestionsYaml.js";
export declare class Suggestions implements ISuggestions {
    "Game objects"?: GameObject[] | undefined;
    "Oracle rolls"?: OracleTableId[] | undefined;
    "Assets"?: AssetId[] | undefined;
    "Moves"?: MoveId[] | undefined;
    "Encounters"?: EncounterId[] | undefined;
    constructor(data: ISuggestionsYaml);
}
//# sourceMappingURL=Suggestions.d.ts.map