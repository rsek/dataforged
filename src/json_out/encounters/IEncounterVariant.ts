import type { IEncounterBase } from "@json_out/encounters/IEncounterBase.js";
import type { EncounterId } from "@json_out/index.js";

export type EncounterVariantId = `${EncounterId}/${string}`;

export interface IEncounterVariant extends IEncounterBase {
  $id: EncounterVariantId;
  "Variant of": EncounterId;
}
