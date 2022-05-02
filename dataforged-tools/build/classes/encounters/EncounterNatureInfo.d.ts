import { EncounterIronsworn } from "./EncounterIronsworn.js";
import type { Source } from "../index.js";
import type { IEncounterNatureInfo } from "../../json_out/index.js";
import type { EncounterNatureIronsworn } from "../../json_out/index.js";
import type { IDisplayWithTitle } from "../../json_out/index.js";
import type { IEncounterNatureInfoYaml } from "../../yaml_in/encounters/IEncounterIronswornYaml.js";
/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export declare class EncounterNatureInfo implements IEncounterNatureInfo {
    $id: IEncounterNatureInfo["$id"];
    Name: EncounterNatureIronsworn;
    Source: Source;
    Display: IDisplayWithTitle;
    Summary: string;
    Description: string;
    Encounters: EncounterIronsworn[];
    constructor(json: IEncounterNatureInfoYaml);
}
//# sourceMappingURL=EncounterNatureInfo.d.ts.map