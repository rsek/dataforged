import type { EncounterIdStarforged, IEncounterStarforged } from "./IEncounterStarforged.js";
import type { StubBy } from "../../utils/types/Stub.js";
/**
 * @public
 */
export declare type EncounterVariantId = `${EncounterIdStarforged}/${string}`;
/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export interface IEncounterVariant extends StubBy<IEncounterStarforged, never, "Features" | "Drives" | "Tactics" | "Variants" | "Summary" | "Your Truth" | "Quest Starter"> {
    $id: EncounterVariantId;
    "Variant of": EncounterIdStarforged;
}
export { StubBy };
//# sourceMappingURL=IEncounterVariant.d.ts.map