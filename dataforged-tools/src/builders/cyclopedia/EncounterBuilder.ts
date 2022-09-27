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
  "Quest starter": string;
  constructor(yaml: YamlEncounterClassic|YamlEncounterStarforged) {
    this.Features = yaml.Features;
    this.Drives = yaml.Drives;
    this.Tactics = yaml.Tactics;
    this.Rank = yaml.Rank;
    this.Description = yaml.Description;
    this["Quest starter"] = yaml["Quest starter"];
  }
}
