import type { IEncounter } from "../../../dist/json_out/encounters/IEncounter.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, ISource, ParagraphsString } from "@dataforged/json_out/index.js";
export interface IEncounterVariant extends Partial<IEncounter> {
    $id: EncounterId;
    Source: ISource;
    Name: string;
    Rank: ChallengeRank;
    Description: ParagraphsString;
    Nature?: EncounterNature | undefined;
    Tags?: EncounterTags[] | undefined;
}
//# sourceMappingURL=IEncounterVariant.d.ts.map