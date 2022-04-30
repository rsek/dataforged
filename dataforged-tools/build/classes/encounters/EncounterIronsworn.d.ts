import { Source } from "../common/Source.js";
import { Encounter } from "./Encounter.js";
import type { EncounterNatureInfo } from "./EncounterNatureInfo.js";
import type { EncounterNatureIronsworn, IDisplayWithTitle, IEncounterIronsworn } from "../../json_out/index.js";
import type { IEncounterIronswornYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class EncounterIronsworn extends Encounter implements IEncounterIronsworn {
    $id: IEncounterIronsworn["$id"];
    Nature: EncounterNatureIronsworn;
    Display: IDisplayWithTitle;
    Source: Source;
    "Your Truth"?: string | undefined;
    constructor(json: IEncounterIronswornYaml, parent: EncounterNatureInfo);
}
//# sourceMappingURL=EncounterIronsworn.d.ts.map