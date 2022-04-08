import type { ChallengeRank } from "@dataforged/constants/ChallengeRank.js";
import type { EncounterNature } from "@dataforged/constants/EncounterNature.js";
import type { EncounterTags } from "@dataforged/constants/EncounterTags.js";
import type { ISource } from "@dataforged/interfaces/json_out/common/ISource.js";
import type IEncounterYaml from "@dataforged/interfaces/yaml_in/encounters/IEncounterYaml.js";
import type { EncounterId } from "@dataforged/strings/id/EncounterId.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export interface IEncounterVariant extends Partial<IEncounterYaml> {
  $id: EncounterId;
  Source: ISource;
  Name: string;
  Rank: ChallengeRank;
  Description: ParagraphsString;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
