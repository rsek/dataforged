import type { MixinDescription, MixinDisplay, MixinId, MixinQuestStarter, MixinSource, MixinSummary, MixinTags, MixinTitle } from '@schema'

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 * @public
 */
export interface CyclopediaEntry extends MixinId, MixinDisplay, MixinDescription, MixinSource, Partial<MixinSummary & MixinQuestStarter & MixinTags>, MixinTitle {
  /**
   * @pattern ^(starforged|ironsworn)/([a-z_]+/)+$
   */
  $id: string
  tags?: string[] | undefined
  /**
   * @markdown
   * @localize
   */
  features?: string[] | undefined
}
