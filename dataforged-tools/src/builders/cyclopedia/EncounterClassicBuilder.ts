import { DisplayBuilder , EncounterBuilder , SourceBuilder , TitleBuilder } from "@builders";
import { EncounterNatureClassic } from "@schema_json";
import type { Display, EncounterClassic , EncounterNatureClassicInfo, Source , Title } from "@schema_json";
import type { YamlEncounterClassic } from "@schema_yaml";
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
  "Your Truth"?: string | undefined;
  constructor(json: YamlEncounterClassic, parent: EncounterNatureClassicInfo) {
    super(json);
    const fragment = json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment,parent.$id);
    this.Title = new TitleBuilder(json.Title, this);
    this.Nature = EncounterNatureClassic[parent.Title.Short];
    this.Display = new DisplayBuilder({});
    this.Source = new SourceBuilder(json.Source ?? {}, parent.Source);
    this["Your Truth"] = json["Your Truth"];
  }
}
