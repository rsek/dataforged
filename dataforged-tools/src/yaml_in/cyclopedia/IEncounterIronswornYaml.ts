//License: MIT
import type { IEncounterIronsworn , IEncounterNatureInfo } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterIronswornYaml extends YamlStub<IEncounterIronsworn, "Display"|"Summary", "Nature"> {
}

/**
 * @internal
 */
export interface IEncounterNatureInfoYaml extends YamlStub<IEncounterNatureInfo, "Display",  "Encounters"> {
  Encounters: IEncounterIronswornYaml[];
}