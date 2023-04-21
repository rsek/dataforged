import type { MixinDescription, MixinQuestStarter, OracleTableRow, RollTemplate } from '@schema'

/**
 * Interface for 'canonical' options within a {@link TruthStarforged} category.
 * @public
 */
export interface TruthOptionStarforged<C extends number | null = number | null, F extends number | null = number | null> extends OracleTableRow<C, F>, MixinQuestStarter, MixinDescription {
  /**
   * @pattern ^starforged/setting_truths/[a-z_]+/(1-33|34-67|68-100)$
   */
  $id: string
  roll_template?: RollTemplate | undefined
  /**
   * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
   */
  subtable?: TruthOptionSubtableRowStarforged[] | undefined
}

/**
 * @see {@link TruthOptionStarforged}, {@link TruthStarforged}
 * @public
 */
export interface TruthOptionSubtableRowStarforged<C extends number | null = number | null, F extends number | null = number | null> extends OracleTableRow<C, F> {
  /**
   * @pattern ^(starforged|ironsworn)/setting_truths/[a-z_]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
   */
  $id: string
}
