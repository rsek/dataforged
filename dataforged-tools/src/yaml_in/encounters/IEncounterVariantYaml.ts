import type { ChallengeRank, EncounterIdStarforged, EncounterNatureStarforged, EncounterTags } from "@json_out/index.js";
import type { IEncounterStarforgedYaml } from "@yaml_in/index.js";

export interface IEncounterVariantYaml extends Partial<IEncounterStarforgedYaml> {
  $id?: EncounterIdStarforged;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNatureStarforged | undefined;
  Tags?: EncounterTags[] | undefined;
}
