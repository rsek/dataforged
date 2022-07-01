
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
import type { IEncounterBase } from "@json_out/index.js";


/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export interface IEncounter extends IEncounterBase {
  Features: string[];
  Drives: string[];
  Tactics: string[];
  "Quest Starter": string;
  /**
   * A markdown string representing the text of the "Your Truth" callout box included with some *Ironsworn* encounters.
   */
  "Your Truth"?: string | undefined;
}


