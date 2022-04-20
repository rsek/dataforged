import { EncounterIronsworn } from "@classes/encounters/EncounterIronsworn.js";
import type { Source } from "@classes/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { EncounterNatureId, IEncounterNatureInfo } from "@json_out/encounters/IEncounterNatureInfo.js";
import type { EncounterNatureIronsworn  } from "@json_out/index.js";
import type { IDisplay } from "@json_out/meta/index.js";
import type { IEncounterNatureInfoYaml } from "@yaml_in/encounters/IEncounterIronswornYaml.js";

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureInfo implements IEncounterNatureInfo {
  $id: EncounterNatureId;
  Name: EncounterNatureIronsworn;
  Source: Source;
  Display: IDisplay;
  Summary: string;
  Description: string;
  Encounters: EncounterIronsworn[];
  constructor(json: IEncounterNatureInfoYaml) {
    this.$id = `${Gamespace.Ironsworn}/Encounters/${json.Name}`;
    this.Name = json.Name;
    this.Source = json.Source;
    const displayTitle = json.Name;
    // TODO: should pluralize, probably
    this.Display = json.Display ?? { Title: displayTitle };
    if (!this.Display.Title) {
      this.Display.Title = displayTitle;
    }
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Encounters = json.Encounters.map(enc => new EncounterIronsworn(enc, this));
  }
}


