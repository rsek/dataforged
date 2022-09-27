import type { HasDescription, HasQuestStarter, OracleTableRow, RollTemplate } from "@schema";

/**
 * Interface for 'canonical' options within a {@link TruthStarforged} category.
 * @public
 */
export interface TruthOptionStarforged extends OracleTableRow, HasQuestStarter, HasDescription {
  /**
   * @pattern ^Starforged/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100)$
   */
  $id: string;
  "Roll template"?: RollTemplate | undefined;
  Subtable?: TruthOptionSubtableRowStarforged[] | undefined;
}

/**
 * @see {@link TruthOptionStarforged}, {@link TruthStarforged}
 * @public
 */
export interface TruthOptionSubtableRowStarforged extends OracleTableRow {
  /**
   * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
   */
  $id: string;
}