import { Source } from "../index.js";
import type { Encounter } from "../index.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, IDisplay, IEncounterVariant, ParagraphsString } from "../../json_out/index.js";
import type { IEncounterVariantYaml } from "../../yaml_in/index.js";
export declare class EncounterVariant implements IEncounterVariant {
    $id: EncounterId;
    Source: Source;
    Name: string;
    Rank: ChallengeRank;
    Display: IDisplay;
    Description: ParagraphsString;
    Nature: EncounterNature;
    "Variant of": EncounterId;
    Tags?: EncounterTags[] | undefined;
    constructor(json: IEncounterVariantYaml, parent: Encounter);
}
//# sourceMappingURL=EncounterVariant.d.ts.map