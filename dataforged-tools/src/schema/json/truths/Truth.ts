import type { Display, MixinDisplay, MixinId, MixinSource, MixinSuggestions, MixinTable, MixinTitle, TitleCaseTitle, TruthOptionStarforged } from '@schema'

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
  CommunicationAndData = 'Communication and data',
  Medicine = 'Medicine',
  ArtificialIntelligence = 'Artificial intelligence',
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
export interface TruthStarforged extends MixinId, MixinSource, MixinDisplay, Partial<MixinSuggestions>, MixinTable, MixinTitle {
  /**
   * @pattern ^starforged/truths/[a-z_]+$
   */
  $id: string
  /**
   * The 'canonical' options for this setting truth category.
   */
  table: TruthOptionStarforged[]
  /**
   * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
   * @markdown
   * @localize
   */
  character: string
  display: Display
  title: TitleCaseTitle
}
