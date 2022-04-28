import type { Gamespace } from "../common/Gamespace.js";
import type { IEncounterIronsworn } from "./IEncounterIronsworn.js";
import type { EncounterNatureIronsworn, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasSummary } from "../index.js";
/**
 * @public
 */
export declare type EncounterNatureIdBase = `Encounters/${EncounterNatureIronsworn}`;
/**
 * @public
 */
export declare type EncounterNatureId = `${Gamespace.Ironsworn}/${EncounterNatureIdBase}`;
/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId<EncounterNatureId>, IHasDisplay, IHasSummary {
    Name: EncounterNatureIronsworn;
    Encounters: IEncounterIronsworn[];
    Summary: string;
}
//# sourceMappingURL=IEncounterNatureInfo.d.ts.map