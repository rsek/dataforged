import type ChallengeRank from "@dataforged/constants/ChallengeRank.js";
import type EncounterNature from "@dataforged/constants/EncounterNature.js";
import type EncounterTags from "@dataforged/constants/EncounterTags.js";
import type IDisplay from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasSummary } from "@dataforged/interfaces/json_out/common/IHas.js";
import type ISource from "@dataforged/interfaces/json_out/common/ISource.js";
import type IEncounterVariant from "@dataforged/interfaces/json_out/encounters/IEncounterVariant.js";
import type EncounterId from "@dataforged/strings/id/EncounterId.js";
import type { FragmentString, ParagraphsString, SentenceString } from "@dataforged/strings/MdString.js";

/**
 * Interface representing an Encounter/Foe entry.
 */
export default interface IEncounter extends IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterId>, IHasSummary {
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
