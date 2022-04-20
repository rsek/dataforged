import type { ChallengeRank, EncounterIdIronsworn, EncounterIdStarforged, EncounterNatureIronsworn, EncounterNatureStarforged, EncounterTags, IDisplay, IEncounter, ISource } from "@json_out/index.js";
import type { IEncounterIronswornYaml, IEncounterStarforgedYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export abstract class Encounter implements IEncounter {
  abstract $id: EncounterIdStarforged | EncounterIdIronsworn;
  Name: string;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  abstract Nature: EncounterNatureIronsworn | EncounterNatureStarforged;
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  abstract Display: IDisplay;
  Description: string;
  abstract Source: ISource;
  "Quest Starter": string;
  constructor(json: IEncounterIronswornYaml|IEncounterStarforgedYaml) {
    this.Name = json.Name;
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    this.Rank = json.Rank;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}
