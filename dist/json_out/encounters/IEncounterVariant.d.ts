import type { IEncounter } from "./IEncounter.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, ISource, ParagraphsString } from "../index.js";
import type { IDisplay } from "../meta/IDisplay.js";
export interface IEncounterVariant extends Partial<IEncounter> {
    $id: EncounterId;
    "Variant of": EncounterId;
    Source: ISource;
    Name: string;
    Rank: ChallengeRank;
    Description: ParagraphsString;
    Nature: EncounterNature;
    Display: IDisplay;
    Tags?: EncounterTags[] | undefined;
}
//# sourceMappingURL=IEncounterVariant.d.ts.map