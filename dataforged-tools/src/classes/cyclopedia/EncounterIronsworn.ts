import { DisplayWithTitle } from "@classes/common/Display.js";
import { Source } from "@classes/common/Source.js";
import { Encounter } from "@classes/cyclopedia/Encounter.js";
import type { EncounterNatureInfo } from "@classes/cyclopedia/EncounterNatureInfo.js";
import type { EncounterNatureIronsworn, IDisplayWithTitle, IEncounterIronsworn } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IEncounterIronswornYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterIronsworn extends Encounter implements IEncounterIronsworn {
  $id: IEncounterIronsworn["$id"];
  Nature: EncounterNatureIronsworn;
  Display: IDisplayWithTitle;
  Source: Source;
  "Your Truth"?: string | undefined;
  constructor(json: IEncounterIronswornYaml, parent: EncounterNatureInfo) {
    super(json);
    this.$id = `${parent.$id}/${formatIdFragment(this.Name)}`;
    this.Nature = parent.Name;
    this.Display = new DisplayWithTitle({
      parentId: this.$id,
      Title: json.Display?.Title ?? this.Name
    });
    this.Source = new Source(json.Source ?? {}, parent.Source);
    this["Your Truth"] = json["Your Truth"];
  }
}
