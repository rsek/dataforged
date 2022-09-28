import type { CyclopediaEntry, HasQuestStarter, HasSummary, TitleCaseTitle } from "@schema";

/**
 * @public
 */
export interface IronlandsRegion extends CyclopediaEntry, HasSummary, HasQuestStarter {
  /**
   * @pattern ^ironsworn/regions/[a-z_-]$
   */
  $id: string;
  Features: string[];
  "Quest starter": string;
  Summary: string;
  Title: TitleCaseTitle;
}

