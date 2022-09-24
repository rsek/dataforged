import { EncounterNatureClassicInfoBuilder } from "../builders";
import { EncounterStarforgedBuilder } from "../builders";
import { Gamespace } from "../schema_json";
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export declare function buildEncounters<G extends Gamespace>(gamespace: G): {
    [key: string]: EncounterStarforgedBuilder;
} | {
    [key: string]: EncounterNatureClassicInfoBuilder;
};
//# sourceMappingURL=buildEncounters.d.ts.map