import { DisplayBuilder, EncounterBuilder, SourceBuilder, TitleBuilder } from "@builders";
import { EncounterNatureClassic, Game } from "@schema";
import type { Display , EncounterClassic, EncounterNatureClassicInfo, Source, Title, YamlEncounterClassic } from "@schema";
import { formatId } from "@utils";


/**
 * @internal
 */
export class EncounterClassicBuilder extends EncounterBuilder implements EncounterClassic {
  $id: EncounterClassic["$id"];
  Title: Title;
  Nature: EncounterNatureClassic;
  Display: Display;
  Source: Source;
  "Your truth"?: string | undefined;
  constructor(yaml: YamlEncounterClassic, parent: EncounterNatureClassicInfo) {
    super(yaml);
    const fragment = yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical;
    this.$id = formatId(fragment,parent.$id);
    this.Title = new TitleBuilder(yaml.Title, this);
    this.Nature = EncounterNatureClassic[parent.Title.Short];
    this.Display = new DisplayBuilder({});
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parent.Source);
    this["Your truth"] = yaml["Your truth"];
  }
}
