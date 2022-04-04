import type EncounterId from "./EncounterId.js";
import type EncounterNature from "./EncounterNature.js";
import type EncounterTags from "./EncounterTags";
import type IEncounterVariant from "./IEncounterVariant.js";
import type IEncounterYaml from "./IEncounterYaml.js";
import type ChallengeRank from "../general/ChallengeRank.js";
import type IDisplay from "../general/IDisplay.js";
import type ISource from "../general/interfaces/ISource.js";
import type MdString from "../general/MdString.js";

// interface for outgoing JSON + deserialization

export default interface IEncounter extends IEncounterYaml {
  $id: EncounterId;
  Name: string;
  Nature: EncounterNature;
  Summary: MdString;
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
