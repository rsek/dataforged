import type { ChallengeRank, CyclopediaEntry, Display, EncounterNatureTypeClassic, EncounterNatureTypeStarforged, EncounterTags } from '@schema'

/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*.
 * @public
 */
export interface EncounterBase extends CyclopediaEntry {
  /**
   * @example "starforged/encounters/chiton"
   * @pattern ^(starforged|ironsworn)/encounters/[a-z_-]+$
   */
  $id: string
  /**
   * @example "Monster"
   * @localize
   */
  nature: EncounterNatureTypeStarforged | EncounterNatureTypeClassic
  display: Display
  /**
   * @example "Insectoid horde"
   * @markdown
   * @localize
   */
  summary?: string | undefined
  tags?: EncounterTags[] | undefined
  rank: ChallengeRank
  /**
   * @markdown
   * @localize
   */
  features?: string[] | undefined
  /**
   * @markdown
   * @localize
   */
  drives?: string[] | undefined
  /**
   * @markdown
   * @localize
   */
  tactics?: string[] | undefined
  /**
   * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
   *
   * Only present in Ironsworn encounters.
   * @markdown
   * @localize
   */
  your_truth?: string | undefined
}
