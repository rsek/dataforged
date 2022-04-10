import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IDisplay, IEncounterVariant, IHasDescription, IHasDisplay, IHasId, IHasName, IHasQuestStarter, IHasSource, IHasSummary, ISource, ParagraphsString } from "../index.js";
/**
 * Interface representing an Encounter/Foe entry.
 */
export interface IEncounter extends IHasQuestStarter, IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterId>, IHasSummary {
    /**
     * @example `"Encounters/Chiton"`
     */
    $id: EncounterId;
    /**
     * @example `"Chiton"`
     */
    Name: string;
    /**
     * @example `"Monster"`
     */
    Nature: EncounterNature;
    /**
     * @example `"Insectoid horde"`
     */
    Summary: FragmentString;
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