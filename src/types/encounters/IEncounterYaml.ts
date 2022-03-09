import ChallengeRank from "../general/ChallengeRank";
import IDisplay from "../general/IDisplay";
import ISource from "../general/interfaces/ISource";
import MdString from "../general/MdString";
import EncounterId from "./EncounterId";
import EncounterNature from "./EncounterNature";
import EncounterTags from "./EncounterTags";
import IEncounterVariantYaml from "./IEncounterVariantYaml";

export default interface IEncounterYaml {
  $id?: EncounterId | undefined;
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Source: ISource;
  Rank: ChallengeRank;
  Display?: IDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariantYaml[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
}
