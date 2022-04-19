import type { IEncounterIronsworn } from "@json_out/encounters/IEncounterIronsworn.js";
import type { IEncounterNatureInfo } from "@json_out/encounters/IEncounterNatureInfo";
import type { StubBy } from "@utils/types/Stub.js";

export interface IEncounterIronswornYaml extends StubBy<IEncounterIronsworn, "Display", "$id" | "Nature"> {
}

export interface IEncounterNatureInfoYaml extends StubBy<IEncounterNatureInfo, "Display", "$id" | "Encounters"> {
  Encounters: IEncounterIronswornYaml[];
}