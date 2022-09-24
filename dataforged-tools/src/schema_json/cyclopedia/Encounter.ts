import type { EncounterBase } from "@schema_json";

/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export interface Encounter extends EncounterBase {
  Features: string[];
  Drives: string[];
  Tactics: string[];
  "Quest Starter": string;
  "Your Truth"?: string | undefined;
}