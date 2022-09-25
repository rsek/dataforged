import type { ChallengeRank, Display , Encounter, EncounterNatureClassic, EncounterNatureStarforged, EncounterTags, Source, Title, YamlEncounterClassic, YamlEncounterStarforged } from "@schema";

/**
 * @internal
 */
export abstract class EncounterBuilder implements Encounter {
  abstract $id: string;
  abstract Title: Title;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  abstract Nature: EncounterNatureClassic | EncounterNatureStarforged;
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  abstract Display: Display;
  Description: string;
  abstract Source: Source;
  "Quest Starter": string;
  constructor(json: YamlEncounterClassic|YamlEncounterStarforged) {
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    this.Rank = json.Rank;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}
