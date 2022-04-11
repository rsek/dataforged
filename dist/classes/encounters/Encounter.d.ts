import { EncounterDisplay, EncounterVariant, Source } from "../index.js";
import type { ChallengeRank, EncounterNature, EncounterTags, IEncounter, ISource } from "../../json_out/index.js";
import type { IEncounterYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class Encounter implements IEncounter {
    $id: IEncounter["$id"];
    Name: string;
    Nature: EncounterNature;
    Summary: string;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    Display: EncounterDisplay;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    Variants: EncounterVariant[];
    Description: string;
    "Quest Starter": string;
    Source: Source;
    constructor(json: IEncounterYaml, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=Encounter.d.ts.map