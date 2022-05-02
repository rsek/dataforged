import type { IEncounter } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";


/**
 * @internal
 */
export interface IEncounterYaml extends StubBy<IEncounter, "Nature" | "Summary" | "Display" | "Source", never> {
}
