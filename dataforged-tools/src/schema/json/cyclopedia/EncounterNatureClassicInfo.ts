import type { EncounterClassic, EncounterNatureClassic, HasDescription, HasDisplay, HasId, HasSource, HasSummary, HasTitle, Title } from "@schema";

/**
 * @public
 */
export type NatureKey = keyof typeof EncounterNatureClassic;

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface EncounterNatureClassicInfo extends HasDescription, HasSource, HasId, HasDisplay, HasSummary, HasTitle {
  /**
   * @pattern ^ironsworn/encounters/[a-z_-]+$
   */
  $id: string;
  Encounters: {[key: string]: EncounterClassic};
  Title: Title & {Short: NatureKey}
}
