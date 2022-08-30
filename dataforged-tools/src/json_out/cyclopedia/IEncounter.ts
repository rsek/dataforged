
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
  "Your Truth"?: string | undefined;
}


