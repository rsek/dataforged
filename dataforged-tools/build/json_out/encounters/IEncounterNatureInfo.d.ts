import type { Gamespace } from "../common/Gamespace.js";
import type { IEncounterIronsworn } from "./IEncounterIronsworn.js";
import type { EncounterNatureIronsworn, IDisplayWithTitle, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasSummary } from "../index.js";
/**
 * @internal
 * @asType string
 */
export declare type EncounterNatureIdBase = `Encounters/${EncounterNatureIronsworn}`;
/**
 * @internal
 * @asType string
 */
export declare type EncounterNatureId = `${Gamespace.Ironsworn}/${EncounterNatureIdBase}`;
/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId, IHasDisplay, IHasSummary {
    /**
     * @pattern ^Ironsworn/Encounters/[A-z_-]+$
     */
    $id: string;
    Name: EncounterNatureIronsworn;
    Encounters: IEncounterIronsworn[];
    Summary: string;
    Display: IDisplayWithTitle;
}
//# sourceMappingURL=IEncounterNatureInfo.d.ts.map