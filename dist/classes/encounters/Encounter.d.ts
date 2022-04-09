import { Source } from "../../../dist/classes/common/Source.js";
import { EncounterDisplay } from "../../../dist/classes/encounters/EncounterDisplay.js";
import { EncounterVariant } from "../../../dist/classes/encounters/EncounterVariant.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IEncounter, ISource, ParagraphsString, SentenceString } from "../../../dist/json_out/index.js";
import type { IEncounterYaml } from "../../../dist/yaml_in/index.js";
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