import { Display } from "@classes/common/Display.js";
import { Source } from "@classes/common/Source.js";
import { Title } from "@classes/common/Title.js";
import { Encounter } from "@classes/cyclopedia/Encounter.js";
import type { EncounterNatureInfo } from "@classes/cyclopedia/EncounterNatureInfo.js";
import type { IDisplay, IEncounterIronsworn } from "@json_out/index.js";
import { EncounterNatureIronsworn } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { IEncounterIronswornYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterIronsworn extends Encounter implements IEncounterIronsworn {
  $id: IEncounterIronsworn["$id"];
  Title: Title;
  Nature: EncounterNatureIronsworn;
  Display: IDisplay;
  Source: Source;
  "Your Truth"?: string | undefined;
  constructor(json: IEncounterIronswornYaml, parent: EncounterNatureInfo) {
    super(json);
    this.$id = `${parent.$id}/${formatIdFragment(json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`;
    this.Title = new Title(json.Title, this);
    this.Nature = EncounterNatureIronsworn[parent.Title.Short as keyof typeof EncounterNatureIronsworn];
    this.Display = new Display({});
    this.Source = new Source(json.Source ?? {}, parent.Source);
    this["Your Truth"] = json["Your Truth"];
  }
}
