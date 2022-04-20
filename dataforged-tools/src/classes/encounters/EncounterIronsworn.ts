import { Source } from "@classes/common/Source.js";
import { Encounter } from "@classes/encounters/Encounter.js";
import type { EncounterNatureInfo } from "@classes/encounters/EncounterNatureInfo.js";
import type { EncounterIdIronsworn, EncounterNatureIronsworn, IDisplay, IEncounterIronsworn } from "@json_out/index.js";
import type { IEncounterIronswornYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterIronsworn extends Encounter implements IEncounterIronsworn {
  $id: EncounterIdIronsworn;
  Nature: EncounterNatureIronsworn;
  Display: IDisplay;
  Source: Source;
  "Your Truth"?: string | undefined;
  constructor(json: IEncounterIronswornYaml, parent: EncounterNatureInfo) {
    super(json);
    this.$id = `${parent.$id}/${this.Name.replaceAll(" ", "_")}`;
    this.Nature = parent.Name;
    this.Display = json.Display ?? { Title: this.Name };
    this.Source = new Source(json.Source);
    this["Your Truth"] = json["Your Truth"];
  }
}
