import { Display, Source , Title } from "@classes/index.js";
import type { IIronswornRegion as IIronswornRegion } from "@json_out/index.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { IIronswornRegionYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class IronswornRegion implements IIronswornRegion {
  $id: string;
  Title: Title;
  Summary: string;
  Display: IDisplay;
  Source: Source;
  Features: string[];
  Tags?: string[] | undefined;
  Description: string;
  "Quest Starter": string;

  constructor(json: IIronswornRegionYaml) {
    this.$id = `Ironsworn/Regions/${formatIdFragment(json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`;
    this.Title = new Title(json.Title,this);
    this.Display = new Display({  });
    this.Source = new Source(json.Source);
    this.Features = json.Features;
    this.Summary = json.Summary;
    this.Description = json.Description;
  }
}
