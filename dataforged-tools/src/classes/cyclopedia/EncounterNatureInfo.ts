import { Display , EncounterIronsworn , Source , Title } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { EncounterNatureIronsworn , IDisplay  , IEncounterNatureInfo , ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { IEncounterNatureInfoYaml } from "@yaml_in/index.js";

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureInfo implements IEncounterNatureInfo {
  $id: IEncounterNatureInfo["$id"];
  Title: Title;
  Source: Source;
  Display: IDisplay;
  Summary: string;
  Description: string;
  Encounters: EncounterIronsworn[];
  constructor(json: IEncounterNatureInfoYaml, parentSource: ISource) {
    this.$id = `${Gamespace.Ironsworn}/Encounters/${formatIdFragment(json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`;
    this.Title = new Title(json.Title, this);
    this.Source = new Source(json.Source ?? {}, parentSource);

    this.Display = new Display({
    });
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Encounters = json.Encounters.map(enc => new EncounterIronsworn(enc, this));
  }
}


