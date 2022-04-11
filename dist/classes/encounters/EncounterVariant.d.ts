import { Source } from "../index.js";
import type { Encounter } from "../index.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, IDisplay, IEncounterVariant } from "../../json_out/index.js";
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
    Nature: EncounterNature;
    "Variant of": EncounterId;
    Tags?: EncounterTags[] | undefined;
    constructor(json: IEncounterVariantYaml, parent: Encounter);
}
//# sourceMappingURL=EncounterVariant.d.ts.map