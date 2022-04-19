import type { IEncounter } from "@json_out/encounters/IEncounter.js";
import type { StubBy } from "@utils/types/Stub.js";


export interface IEncounterYaml extends StubBy<IEncounter, "Nature" | "Summary" | "Display" | "Source", never> {
}
