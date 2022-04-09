import type { IEncounter } from "@dataforged/json_out/index.js";
import type { StubBy } from "../../../dist/utils/types/Stub.js";
import type { IEncounterVariantYaml } from "@dataforged/yaml_in/index.js";
export interface IEncounterYaml extends StubBy<IEncounter, "$id" | "Display", "Variants"> {
    Variants?: IEncounterVariantYaml[] | undefined;
}
//# sourceMappingURL=IEncounterYaml.d.ts.map