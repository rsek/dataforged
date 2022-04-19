import { GameObject } from "../index.js";
import type { IAsset } from "../../json_out/assets/IAsset.js";
import type { IEncounterStarforged } from "../../json_out/encounters/IEncounterStarforged";
import type { IMove, IOracle, ISuggestions } from "../../json_out/index.js";
import type { ISuggestionsYaml } from "../../yaml_in/common/ISuggestionsYaml.js";
/**
 * @internal
 */
export declare class Suggestions implements ISuggestions {
    "Game objects"?: GameObject[] | undefined;
    "Oracle rolls"?: IOracle["$id"][] | undefined;
    "Assets"?: IAsset["$id"][] | undefined;
    "Moves"?: IMove["$id"][] | undefined;
    "Encounters"?: IEncounterStarforged["$id"][] | undefined;
    constructor(data: ISuggestionsYaml);
}
//# sourceMappingURL=Suggestions.d.ts.map