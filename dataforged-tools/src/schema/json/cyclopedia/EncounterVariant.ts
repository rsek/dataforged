import type { EncounterStarforged } from "@schema";
import type { StubBy } from "@utils/types/Stub.js";

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export interface EncounterVariant extends StubBy<EncounterStarforged, never, "Features"|"Drives"|"Tactics"|"Variants"|"Summary"|"Your Truth"|"Quest Starter"> {
  /**
   * @pattern ^Starforged/Encounters/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  "Variant of": EncounterStarforged["$id"];
}