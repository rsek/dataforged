import type { IEncounterStarforged } from "@json_out/index.js";
import type { IEncounterVariantYaml, YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterStarforgedYaml extends YamlStubTitle<IEncounterStarforged, "Display"|"Source", "Variants"> {
  Variants: IEncounterVariantYaml[];
}
