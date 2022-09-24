import type { HasDescription, HasQuestStarter , OracleTableRow , RollTemplate } from "@schema_json";

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link SettingTruth}
 * @public
 */
export interface TruthOption extends OracleTableRow, HasQuestStarter, HasDescription {
  /**
   * @pattern ^Starforged/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100)$
   */
  $id: string;
  "Roll template"?: RollTemplate | undefined;
  Subtable?: TruthOptionSubtableRow[] | undefined;
}

/**
 * @see {@link TruthOption}, {@link Truth}
 * @public
 */
export interface TruthOptionSubtableRow extends OracleTableRow {
  /**
   * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
   */
  $id: string;
}