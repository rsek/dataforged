import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IDisplay, IEncounterVariant, IHasDescription, IHasDisplay, IHasId, IHasName, IHasQuestStarter, IHasSource, IHasSummary, ISource, ParagraphsString, SentenceString } from "@dataforged/json_out/index.js";
export interface IEncounter extends IHasQuestStarter, IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterId>, IHasSummary {
    $id: EncounterId;
    Name: string;
    Nature: EncounterNature;
    Summary: SentenceString | FragmentString;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    Display: IDisplay;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    Variants?: IEncounterVariant[] | undefined;
    Description: ParagraphsString;
    "Quest Starter": ParagraphsString;
    Source: ISource;
}
//# sourceMappingURL=IEncounter.d.ts.map