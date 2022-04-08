
import type { ChallengeRank, EncounterId , EncounterNature, EncounterTags, ISource , ParagraphsString } from "@dataforged/json_out/index.js";
import type { IEncounterYaml } from "@dataforged/yaml_in/index.js";

export interface IEncounterVariant extends Partial<IEncounterYaml> {
  $id: EncounterId;
  Source: ISource;
  Name: string;
  Rank: ChallengeRank;
  Description: ParagraphsString;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
