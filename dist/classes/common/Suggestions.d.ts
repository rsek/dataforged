import { GameObject } from "../index.js";
import type { AssetId, EncounterId, ISuggestions, MoveId, OracleTableId } from "../../json_out/index.js";
import type { ISuggestionsYaml } from "../../yaml_in/common/ISuggestionsYaml.js";
/**
 * Object representing "non-canon" suggestions for related Starforged game content. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
 */
export declare class Suggestions implements ISuggestions {
    "Game objects"?: GameObject[] | undefined;
    "Oracle rolls"?: OracleTableId[] | undefined;
    "Assets"?: AssetId[] | undefined;
    "Moves"?: MoveId[] | undefined;
    "Encounters"?: EncounterId[] | undefined;
    constructor(data: ISuggestionsYaml);
}
//# sourceMappingURL=Suggestions.d.ts.map