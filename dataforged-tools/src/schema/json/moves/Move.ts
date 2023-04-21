import type { Asset, MixinDisplay, MixinId, MixinOptional, MixinSource, MixinSuggestions, MixinTags, MixinText, MixinTitle, MoveCategory, MoveTrigger, OracleTable, Outcomes, TitleCaseTitle } from '@schema'

/**
 * Interface representing a Starforged move.
 * @public
 */
export interface Move extends MixinId, MixinText, MixinDisplay, MixinSource, MixinOptional, MixinTitle, Partial<MixinSuggestions & MixinTags> {
  /**
   * @example "starforged/moves/adventure/face_danger"
   * @pattern ^(starforged|ironsworn)/moves/([a-z_]+|assets/[a-z_]+/[a-z_]+/[1-3])/[a-z_]+$
   */
  $id: string
  /**
   * Note the "Canonical" key for asset-specific moves is something of a misnomer, as in the original text doesn't name them. They're provided in the same format for convenience, however.
   * @see MixinTitle
   * @example
   * ```json
   * {"Canonical": "Face Danger"}
   * ```
   */
  title: TitleCaseTitle
  /**
   * The ID of the parent Asset of the move, if any.
   */
  asset?: Asset['$id'] | undefined
  /**
   * The ID of the move's category.
   * @example "starforged/moves/adventure"
   */
  category: MoveCategory['$id']
  /**
   * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
   */
  progress_move?: boolean | undefined
  /**
   * The ID of the move that this move is a variant of, if any.
   */
  variant_of?: Move['$id'] | undefined
  /**
   * The move's trigger data.
   */
  trigger: MoveTrigger
  /**
   * The IDs of any oracles directly referenced by the move, or vice versa.
   */
  oracles?: OracleTable['$id'][] | undefined
  /**
   * Outcome information for the move.
   */
  outcomes?: Outcomes | undefined
}
