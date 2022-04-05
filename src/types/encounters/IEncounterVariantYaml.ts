import type EncounterId from "./EncounterId.js";
import type EncounterNature from "./EncounterNature.js";
import type EncounterTags from "./EncounterTags.js";
import type IEncounterYaml from "./IEncounterYaml.js";
import type ChallengeRank from "../general/ChallengeRank.js";
import type { ParagraphsString } from "../general/StringTypes.js";

export default interface IEncounterVariantYaml extends Partial<IEncounterYaml> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: ParagraphsString;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
