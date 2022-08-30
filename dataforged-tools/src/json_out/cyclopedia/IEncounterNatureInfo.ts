import type { EncounterNatureIronsworn , IDisplayWithTitle, IEncounterIronsworn, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasSummary, IHasTitle } from "@json_out/index.js";

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId, IHasDisplay, IHasSummary, IHasTitle {
  /**
   * @pattern ^Ironsworn/Encounters/[A-z_-]+$
   */
  $id: string;
  Name: EncounterNatureIronsworn;
  Encounters: IEncounterIronsworn[];
  Summary: string;
  Display: IDisplayWithTitle;
}
