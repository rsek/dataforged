import type { ICyclopediaEntry } from "@json_out/cyclopedia/ICyclopediaEntry.js";
import type { ISource } from "@json_out/meta/ISource.js";

/**
 * @public
 */
export interface IIronswornRegion extends ICyclopediaEntry {
  /**
   * @pattern ^Ironsworn/Regions/[A-z_-]$
   */
  $id: string;
  Summary: string;
  Features: string[];
  "Quest Starter": string;
  Source: ISource;
}

