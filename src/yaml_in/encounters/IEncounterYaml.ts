import type { IEncounter } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";

export interface IEncounterYaml extends StubBy<IEncounter, "$id"|"Display", "Variants"> {
  Variants: IEncounterVariantYaml[];
}
