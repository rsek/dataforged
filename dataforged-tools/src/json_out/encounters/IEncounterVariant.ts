import type { EncounterIdStarforged, IEncounterStarforged } from "@json_out/encounters/IEncounterStarforged.js";
import type { StubBy } from "@utils/types/Stub.js";
/**
 * @internal
 * @asType string
 */
export type EncounterVariantId = `${EncounterIdStarforged}/${string}`;

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export interface IEncounterVariant extends StubBy<IEncounterStarforged, never, "Features"|"Drives"|"Tactics"|"Variants"|"Summary"|"Your Truth"|"Quest Starter"> {
  /**
   * @pattern ^Starforged/Encounters/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  // $id: EncounterVariantId;
  "Variant of": IEncounterStarforged["$id"];
}

export { StubBy };