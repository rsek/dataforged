import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags } from "@json_out/index.js";
import type { IEncounterYaml } from "@yaml_in/index.js";

export interface IEncounterVariantYaml extends Partial<IEncounterYaml> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
