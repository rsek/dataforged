import { EncounterDisplay, EncounterVariant, Source } from "../index.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IEncounter, ISource, ParagraphsString, SentenceString } from "../../json_out/index.js";
import type { IEncounterYaml } from "../../yaml_in/index.js";
export declare class Encounter implements IEncounter {
    $id: EncounterId;
    Name: string;
    Nature: EncounterNature;
    Summary: SentenceString | FragmentString;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    Display: EncounterDisplay;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    Variants?: EncounterVariant[] | undefined;
    Description: ParagraphsString;
    "Quest Starter": ParagraphsString;
    Source: Source;
    constructor(json: IEncounterYaml, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=Encounter.d.ts.map