import type { HasDescription, HasDisplay, HasId, HasQuestStarter, HasSource, HasSummary, HasTags, HasTitle } from '@schema'

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 * @public
 */
export interface CyclopediaEntry extends HasId, HasDisplay, HasDescription, HasSource, Partial<HasSummary & HasQuestStarter & HasTags>, HasTitle {
  /**
   * @pattern ^(starforged|ironsworn)/([a-z_-]+/)+$
   */
  $id: string
  Tags?: string[] | undefined
  /**
   * @markdown
   * @localize
   */
  Features?: string[] | undefined
}
