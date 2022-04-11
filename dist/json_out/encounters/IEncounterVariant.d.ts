import type { IEncounterBase } from "./IEncounterBase.js";
import type { EncounterId } from "../index.js";
export declare type EncounterVariantId = `${EncounterId}/${string}`;
export interface IEncounterVariant extends IEncounterBase {
    $id: EncounterVariantId;
    "Variant of": EncounterId;
}
//# sourceMappingURL=IEncounterVariant.d.ts.map