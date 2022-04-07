
// interface for outgoing JSON + deserialization

import type IDisplay from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type ISource from "@dataforged/interfaces/json_out/common/ISource.js";
import type IEncounterVariant from "@dataforged/interfaces/json_out/encounters/IEncounterVariant.js";
import type EncounterId from "@dataforged/strings/id/EncounterId.js";
import type { FragmentString, ParagraphsString, SentenceString } from "@dataforged/strings/MdString.js";
import type ChallengeRank from "@dataforged/constants/ChallengeRank.js";
import type EncounterNature from "@dataforged/constants/EncounterNature.js";
import type EncounterTags from "@dataforged/constants/EncounterTags.js";

export default interface IEncounter {
  $id: EncounterId;
  Name: string;
  Nature: EncounterNature;
  Summary: SentenceString | FragmentString;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: IDisplay;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariant[] | undefined;
  Description: ParagraphsString;
  "Quest Starter": ParagraphsString;
  Source: ISource;
}
