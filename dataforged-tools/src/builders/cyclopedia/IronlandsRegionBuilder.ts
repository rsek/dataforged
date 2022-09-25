import { DisplayBuilder, SourceBuilder , TitleBuilder } from "@builders";
import { Gamespace } from "@schema_json";
import type { Display, IronlandsRegion as IronlandsRegion , Source , Title } from "@schema_json";
import type { YamlIronswornRegion } from "@schema_yaml";
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
    this.$id = formatId(fragment, Gamespace.Ironsworn, "Regions");
    this.Title = new TitleBuilder(json.Title,this);
    this.Display = new DisplayBuilder({  });
    this.Source = new SourceBuilder(json.Source ?? {}, rootSource);
    this.Features = json.Features;
    this.Summary = json.Summary;
    this.Description = json.Description;
  }
}
