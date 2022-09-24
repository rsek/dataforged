import type { ChallengeRank , CyclopediaEntry , Display , EncounterNatureClassic, EncounterNatureStarforged, EncounterTags } from "@schema_json";

/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*, plus 'stubs' like EncounterVariant. EncounterVariant. EncounterVariant.
 * @see {@link Encounter}, {@link EncounterVariant}
 * @public
 */
export interface EncounterBase extends CyclopediaEntry {
  /**
   * @example "Starforged/Encounters/Chiton"
   * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+$
   */
  $id: string;
  /**
   * @example "Monster"
   * @localize
   */
  Nature: EncounterNatureStarforged | EncounterNatureClassic;
  Display: Display;
  /**
   * @example "Insectoid horde"
   * @markdown
   * @localize
   */
  Summary?: string | undefined;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  /**
   * @markdown
   * @localize
   */
  Features?: string[] | undefined;
  /**
   * @markdown
   * @localize
   */
  Drives?: string[] | undefined;
  /**
   * @markdown
   * @localize
   */
  Tactics?: string[] | undefined;
  /**
   * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
   *
   * Only present in Ironsworn encounters.
   * @markdown
   * @localize
   */
  "Your Truth"?: string | undefined;
}