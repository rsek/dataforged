import type { Display, HasDisplay, HasId, HasSource, HasSuggestions, HasTable, HasTitle, TitleCaseTitle, TruthOptionStarforged } from '@schema'

/**
 * @public
 */
export enum SettingTruthName {
  Cataclysm = 'Cataclysm',
  Exodus = 'Exodus',
  Communities = 'Communities',
  Iron = 'Iron',
  Laws = 'Laws',
  Religion = 'Religion',
  Magic = 'Magic',
  CommunicationAndData = 'Communication and Data',
  Medicine = 'Medicine',
  ArtificialIntelligence = 'Artificial Intelligence',
  War = 'War',
  Lifeforms = 'Lifeforms',
  Precursors = 'Precursors',
  Horrors = 'Horrors'
}

/**
 * Interface for Starforged Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see TruthOptionStarforged
 * @public
 */
export interface TruthStarforged extends HasId, HasSource, HasDisplay, Partial<HasSuggestions>, HasTable, HasTitle {
  /**
   * @pattern ^starforged/truths/[a-z_-]+$
   */
  $id: string
  /**
   * The 'canonical' options for this setting truth category.
   */
  Table: TruthOptionStarforged[]
  /**
   * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
   * @markdown
   * @localize
   */
  Character: string
  Display: Display
  Title: TitleCaseTitle
}
