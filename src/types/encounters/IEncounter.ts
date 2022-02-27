import ChallengeRank from '../general/ChallengeRank';
import IDisplay from "../general/Display";
import ISource from "../general/interfaces/ISource";
import MdString from '../general/MdString';
import EncounterId from "./EncounterId";
import EncounterNature from "./EncounterNature";
import EncounterTags from "./EncounterTags";
import IEncounterVariant from "./IEncounterVariant";
import IEncounterYaml from './IEncounterYaml';

// interface for outgoing JSON + deserialization

export default interface IEncounter extends IEncounterYaml {
  $id: EncounterId;
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display?: IDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariant[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
  Source: ISource;
}
