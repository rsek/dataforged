import type { IEncounterStarforged } from "@json_out/index.js";
import type { IEncounterVariantYaml, YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterStarforgedYaml extends YamlStub<IEncounterStarforged, "Display"|"Source", "Variants"> {
  Variants: IEncounterVariantYaml[];
}
