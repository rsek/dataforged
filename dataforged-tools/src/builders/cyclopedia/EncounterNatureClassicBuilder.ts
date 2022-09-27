import { DisplayBuilder, EncounterClassicBuilder, SourceBuilder, TitleBuilder } from "@builders";
import type { Display , EncounterClassic, EncounterNatureClassicInfo, Source, YamlEncounterNatureInfo } from "@schema";
import {  Game } from "@schema";
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
  constructor(yaml: YamlEncounterNatureInfo, parentSource: Source) {
    const fragment = yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical;
    this.$id =  formatId(fragment, Game.Ironsworn, "Encounters");
    this.Title = new TitleBuilder(yaml.Title, this) as EncounterNatureClassicInfo["Title"];
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parentSource);

    this.Display = new DisplayBuilder({
    });
    this.Summary = yaml.Summary;
    this.Description = yaml.Description;
    this.Encounters = _.mapValues(yaml.Encounters,enc => new EncounterClassicBuilder(enc, this));
  }
}


