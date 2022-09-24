import type { CyclopediaEntry, HasQuestStarter, HasSummary } from "@schema_json";

/**
 * @public
 */
export interface IronlandsRegion extends CyclopediaEntry, HasSummary, HasQuestStarter {
  /**
   * @pattern ^Ironsworn/Regions/[A-z_-]$
   */
  $id: string;
  Features: string[];
  "Quest Starter": string;
  Summary: string;
}

