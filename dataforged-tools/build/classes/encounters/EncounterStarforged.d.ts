import { EncounterDisplay, EncounterVariant, Source } from "../index.js";
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterStarforged, ISource } from "../../json_out/index.js";
import type { IEncounterStarforgedYaml } from "../../yaml_in/index.js";
/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @internal
 */
export declare class EncounterStarforged implements IEncounterStarforged {
    $id: IEncounterStarforged["$id"];
    Name: string;
    Nature: EncounterNatureStarforged;
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
    constructor(json: IEncounterStarforgedYaml, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=EncounterStarforged.d.ts.map