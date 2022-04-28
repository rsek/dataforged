import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IEncounterIronsworn } from "@json_out/encounters/IEncounterIronsworn.js";
import type { EncounterNatureIronsworn, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasSummary } from "@json_out/index.js";
/**
 * @public
 */
export type EncounterNatureIdBase = `Encounters/${EncounterNatureIronsworn}`;
/**
 * @public
 */
export type EncounterNatureId = `${Gamespace.Ironsworn}/${EncounterNatureIdBase}`;


/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId<EncounterNatureId>, IHasDisplay, IHasSummary {
  Name: EncounterNatureIronsworn;
  Encounters: IEncounterIronsworn[];
  Summary: string;
}
