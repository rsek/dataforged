import { DisplayWithTitle , EncounterIronsworn , Source } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { EncounterNatureIronsworn , IDisplayWithTitle  , IEncounterNatureInfo , ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IEncounterNatureInfoYaml } from "@yaml_in/index.js";

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureInfo implements IEncounterNatureInfo {
  $id: IEncounterNatureInfo["$id"];
  Name: EncounterNatureIronsworn;
  Source: Source;
  Display: IDisplayWithTitle;
  Summary: string;
  Description: string;
  Encounters: EncounterIronsworn[];
  constructor(json: IEncounterNatureInfoYaml, parentSource: ISource) {
    this.$id = `${Gamespace.Ironsworn}/Encounters/${formatIdFragment(json.Name)}`;
    this.Name = json.Name;
    this.Source = new Source(json.Source ?? {}, parentSource);

    this.Display = new DisplayWithTitle({
      parentId: this.$id,
      Title: json.Display?.Title ?? this.Name
    });
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Encounters = json.Encounters.map(enc => new EncounterIronsworn(enc, this));
  }
}


