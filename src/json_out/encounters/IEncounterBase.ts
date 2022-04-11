import type { ChallengeRank } from "@json_out/common/index.js";
import type { EncounterId , EncounterNature , EncounterTags } from "@json_out/encounters/index.js";
import type { IHasDescription, IHasDisplay, IHasId, IHasName, IHasQuestStarter, IHasSource, IHasSummary } from "@json_out/meta/IHas.js";
import type { IDisplay } from "@json_out/meta/index.js";

/**
 * Interface common to Encounter and Foe entries in *Ironsworn* and *Ironsworn: Starforged*.
 * @see {@link IEncounter}, {@link IEncounterVariant}
 */
export interface IEncounterBase extends IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterId>,Partial<IHasQuestStarter & IHasSummary> {
  /**
   * @example "Encounters/Chiton"
   */
  $id: EncounterId;
  /**
   * @example "Chiton"
   */
  Name: string;
  /**
   * @example "Monster"
   */
  Nature: EncounterNature;
  /**
   * @example "Insectoid horde"
   * @markdown
   */
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Features?: string[] | undefined;
  Drives?: string[] | undefined;
  Tactics?: string[] | undefined;
}