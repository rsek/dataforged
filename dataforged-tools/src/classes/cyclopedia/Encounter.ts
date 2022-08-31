import type { Source } from "@classes/common/Source.js";
import type { Title } from "@classes/common/Title.js";
import type { ChallengeRank, EncounterNatureIronsworn, EncounterNatureStarforged, EncounterTags, IDisplay, IEncounter } from "@json_out/index.js";
import type { IEncounterIronswornYaml, IEncounterStarforgedYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export abstract class Encounter implements IEncounter {
  abstract $id: string;
  abstract Title: Title;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  abstract Nature: EncounterNatureIronsworn | EncounterNatureStarforged;
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  abstract Display: IDisplay;
  Description: string;
  abstract Source: Source;
  "Quest Starter": string;
  constructor(json: IEncounterIronswornYaml|IEncounterStarforgedYaml) {
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    this.Rank = json.Rank;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}
