import type { IHasDescription, IHasDisplay, IHasId, IHasName, IHasQuestStarter, IHasSource, IHasSummary, IHasTags } from "@json_out/meta/IHas.js";

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn*) and Encounters *(Ironsworn* and *Starforged*)
 * @public
 */
export interface ICyclopediaEntry extends IHasName, IHasId, IHasDisplay, IHasDescription, IHasSource, Partial<IHasSummary & IHasQuestStarter & IHasTags> {
  /**
   * @pattern ^(Starforged|Ironsworn)/([A-z_-]+/)+$
   */
  $id: string;
  Name: string;
  Tags?: string[] | undefined;
  Features?: string[] | undefined;
}