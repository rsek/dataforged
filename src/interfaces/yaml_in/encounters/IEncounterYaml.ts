import type { IEncounter } from "@dataforged/interfaces/json_out/encounters/IEncounter.js";
import type IEncounterVariantYaml from "@dataforged/interfaces/yaml_in/encounters/IEncounterVariantYaml.js";
import type { StubBy } from "@dataforged/utils/types/Stub.js";

export default interface IEncounterYaml extends StubBy<IEncounter, "$id"|"Display", "Variants"> {
  Variants?: IEncounterVariantYaml[] | undefined;
}
