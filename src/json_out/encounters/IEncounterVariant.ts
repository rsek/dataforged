
import type { IEncounter } from "@json_out/encounters/IEncounter.js";
import type { ChallengeRank, EncounterId , EncounterNature, EncounterTags, ISource , ParagraphsString } from "@json_out/index.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";

export interface IEncounterVariant extends Partial<IEncounter> {
  $id: EncounterId;
  "Variant of": EncounterId;
  Source: ISource;
  Name: string;
  Rank: ChallengeRank;
  Description: ParagraphsString;
  Nature: EncounterNature;
  Display: IDisplay;
  Tags?: EncounterTags[] | undefined;
}
