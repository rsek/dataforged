import ChallengeRank from "../general/ChallengeRank";
import EncounterId from "./EncounterId";
import EncounterTags from "./EncounterTags";
import EncounterNature from "./EncounterNature";
import ISource from "../general/interfaces/ISource";
import IEncounterVariantYaml from "./IEncounterVariantYaml";



export default interface IEncounterVariant extends IEncounterVariantYaml {
  $id: EncounterId;
  Source: ISource;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}
