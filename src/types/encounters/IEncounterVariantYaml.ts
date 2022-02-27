import ChallengeRank from "../general/ChallengeRank";
import IEncounterYaml from "./IEncounterYaml";
import EncounterId from "./EncounterId";
import EncounterTags from "./EncounterTags";
import EncounterNature from "./EncounterNature";



export default interface IEncounterVariantYaml extends Partial<IEncounterYaml> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
