
import type { IEncounterBase } from "@json_out/encounters/IEncounterBase.js";
import type { IEncounterVariant } from "@json_out/index.js";

/**
 * Interface representing an *Ironsworn: Starforged* Encounter entry.
 */
export interface IEncounter extends IEncounterBase {
  "Quest Starter": string;
  Summary: string;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants: IEncounterVariant[];
}
