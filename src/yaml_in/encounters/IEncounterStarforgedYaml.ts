import type { IEncounterStarforged } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";

export interface IEncounterStarforgedYaml extends StubBy<IEncounterStarforged, "$id"|"Display", "Variants"> {
  Variants: IEncounterVariantYaml[];
}
