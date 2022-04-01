import type EncounterId from "./EncounterId.js";
import type EncounterNature from "./EncounterNature.js";
import type EncounterTags from "./EncounterTags";
import type IEncounterVariantYaml from "./IEncounterVariantYaml.js";
import type ChallengeRank from "../general/ChallengeRank.js";
import type IDisplay from "../general/IDisplay.js";
import type ISource from "../general/interfaces/ISource.js";
import type MdString from "../general/MdString.js";

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
