import { Source } from "../index.js";
import type { EncounterStarforged } from "../index.js";
import type { ChallengeRank, EncounterIdStarforged, EncounterNatureStarforged, EncounterTags, IDisplay, IEncounterVariant } from "../../json_out/index.js";
import type { IEncounterVariantYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class EncounterVariant implements IEncounterVariant {
    $id: IEncounterVariant["$id"];
    Source: Source;
    Name: string;
    Rank: ChallengeRank;
    Display: IDisplay;
    Description: string;
    Nature: EncounterNatureStarforged;
    "Variant of": EncounterIdStarforged;
    Tags?: EncounterTags[] | undefined;
    constructor(json: IEncounterVariantYaml, parent: EncounterStarforged);
}
//# sourceMappingURL=EncounterVariant.d.ts.map