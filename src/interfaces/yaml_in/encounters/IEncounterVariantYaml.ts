import type { ChallengeRank } from "@dataforged/constants/ChallengeRank.js";
import type { EncounterNature } from "@dataforged/constants/EncounterNature.js";
import type { EncounterTags } from "@dataforged/constants/EncounterTags.js";
import type IEncounterYaml from "@dataforged/interfaces/yaml_in/encounters/IEncounterYaml.js";
import type { EncounterId } from "@dataforged/strings/id/EncounterId.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export default interface IEncounterVariantYaml extends Partial<IEncounterYaml> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: ParagraphsString;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
