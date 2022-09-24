import type { Display, HasDisplay, HasId, HasSource, HasSuggestions, HasTable, HasTitle, TruthOption } from "@schema_json";

/**
 * @public
 */
export enum SettingTruthName {
    Cataclysm = "Cataclysm",
    Exodus = "Exodus",
    Communities = "Communities",
    Iron = "Iron",
    Laws = "Laws",
    Religion = "Religion",
    Magic = "Magic",
    CommunicationAndData = "Communication and Data",
    Medicine = "Medicine",
    ArtificialIntelligence = "Artificial Intelligence",
    War = "War",
    Lifeforms = "Lifeforms",
    Precursors = "Precursors",
    Horrors = "Horrors"
}

/**
 * Interface for Starforged Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see TruthOption
 * @public
 */
export interface Truth extends HasId, HasSource, HasDisplay, Partial<HasSuggestions>, HasTable, HasTitle {
  /**
   * @pattern ^Starforged/Setting_Truths/[A-z_-]+$
   */
  $id: string;
  /**
   * The 'canonical' options for this setting truth category.
   */
  Table: TruthOption[];
  /**
   * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
   * @markdown
   * @localize
   */
  Character: string;
  Display: Display;
}
