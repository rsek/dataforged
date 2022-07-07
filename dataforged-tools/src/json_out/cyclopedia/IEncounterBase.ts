import type { ChallengeRank , EncounterNatureIronsworn , EncounterNatureStarforged , EncounterTags, ICyclopediaEntry, IDisplayWithTitle } from "@json_out/index.js";

/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*, plus 'stubs' like IEncounterVariant.
 * @see {@link IEncounter}, {@link IEncounterVariant}
 * @public
 */
export interface IEncounterBase extends ICyclopediaEntry {
  /**
   * @example "Starforged/Encounters/Chiton"
   * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+$
   */
  $id: string;
  /**
   * @example "Chiton"
   */
  Name: string;
  /**
   * @example "Monster"
   */
  Nature: EncounterNatureStarforged | EncounterNatureIronsworn;
  Display: IDisplayWithTitle;
  /**
   * @example "Insectoid horde"
   * @markdown
   */
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  /**
   * @markdown
   */
  Features?: string[] | undefined;
  /**
   * @markdown
   */
  Drives?: string[] | undefined;
  /**
   * @markdown
   */
  Tactics?: string[] | undefined;
  /**
   * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
   *
   * Only present in Ironsworn encounters.
   * @markdown
   */
  "Your Truth"?: string | undefined;
}