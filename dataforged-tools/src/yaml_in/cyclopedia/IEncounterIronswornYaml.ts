import type { IEncounterIronsworn , IEncounterNatureInfo } from "@json_out/index.js";
import type { YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterIronswornYaml extends YamlStubTitle<IEncounterIronsworn, "Display"|"Summary", "Nature"> {
}

/**
 * @internal
 */
export interface IEncounterNatureInfoYaml extends YamlStubTitle<IEncounterNatureInfo, "Display",  "Encounters"> {
  Encounters: IEncounterIronswornYaml[];
}