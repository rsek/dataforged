import type { ChallengeRank, EncounterNatureIronsworn, EncounterNatureStarforged, EncounterTags, IDisplayWithTitle, IEncounter, ISource } from "../../json_out/index.js";
import type { IEncounterIronswornYaml, IEncounterStarforgedYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class Encounter implements IEncounter {
    abstract $id: string;
    Name: string;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    abstract Nature: EncounterNatureIronsworn | EncounterNatureStarforged;
    Summary?: string | undefined;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    abstract Display: IDisplayWithTitle;
    Description: string;
    abstract Source: ISource;
    "Quest Starter": string;
    constructor(json: IEncounterIronswornYaml | IEncounterStarforgedYaml);
}
//# sourceMappingURL=Encounter.d.ts.map