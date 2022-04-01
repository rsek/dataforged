import type EncounterId from "./EncounterId.js";
import type EncounterNature from "./EncounterNature.js";
import type EncounterTags from "./EncounterTags";
import type IEncounterYaml from "./IEncounterYaml.js";
import type ChallengeRank from "../general/ChallengeRank.js";

export default interface IEncounterVariantYaml extends Partial<IEncounterYaml> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
