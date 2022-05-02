import type { IEncounterIronsworn , IEncounterNatureInfo } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";

/**
 * @internal
 */
export interface IEncounterIronswornYaml extends StubBy<IEncounterIronsworn, "Display"|"Summary", "$id" | "Nature"> {
}

/**
 * @internal
 */
export interface IEncounterNatureInfoYaml extends StubBy<IEncounterNatureInfo, "Display", "$id" | "Encounters"> {
  Encounters: IEncounterIronswornYaml[];
}