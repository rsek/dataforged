import { DisplayBuilder, SourceBuilder, TitleBuilder } from "@builders";
import { Game } from "@schema";
import type { Display, IronlandsRegion, Source, Title , YamlIronswornRegion } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class IronlandsRegionBuilder implements IronlandsRegion {
  $id: string;
  Title: Title;
  Summary: string;
  Display: Display;
  Source: Source;
  Features: string[];
  Tags?: string[] | undefined;
  Description: string;
  "Quest Starter": string;

  constructor(json: YamlIronswornRegion, rootSource: Source) {
    const fragment = json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment, Game.Ironsworn, "Regions");
    this.Title = new TitleBuilder(json.Title,this);
    this.Display = new DisplayBuilder({  });
    this.Source = new SourceBuilder(json.Source ?? {}, rootSource);
    this.Features = json.Features;
    this.Summary = json.Summary;
    this.Description = json.Description;
  }
}
