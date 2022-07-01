//License: MIT
import type { IEncounter } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";


/**
 * @internal
 */
export interface IEncounterYaml extends YamlStub<IEncounter, "Nature" | "Summary" | "Display" | "Source", ""> {
}
