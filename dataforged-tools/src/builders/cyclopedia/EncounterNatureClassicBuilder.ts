import { DisplayBuilder, EncounterClassicBuilder, SourceBuilder, TitleBuilder } from "@builders";
import { Gamespace } from "@schema";
import type { Display , EncounterClassic, EncounterNatureClassicInfo, Source } from "@schema";
import tyGameEncounterNatureInfo } from "@schema/yaml/cyclopedia/YamlEncounterIronsworn.js";
import { formatId } from "@utils";
import _ from "lodash-es";

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureClassicInfoBuilder implements EncounterNatureClassicInfo {
  $id: EncounterNatureClassicInfo["$id"];
  Title: EncounterNatureClassicInfo["Title"];
  Source: Source;
  Display: Display;
  Summary: string;
  Description: string;
  Encounters: {[key: string]: EncounterClassic};
  constructor(json: YamlEncounterNatureInfo, parentSource: Source) {
    const fragment = json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id =  formatId(fragment, Game.Ironsworn, "Encounters");
    this.Title = new TitleBuilder(json.Title, this) as EncounterNatureClassicInfo["Title"];
    this.Source = new SourceBuilder(json.Source ?? {}, parentSource);

    this.Display = new DisplayBuilder({
    });
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Encounters = _.mapValues(json.Encounters,enc => new EncounterClassicBuilder(enc, this));
  }
}


