import { DisplayWithTitle } from "@classes/index.js";
import type { IIronswornRegion as IIronswornRegion } from "@json_out/index.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";
import type { ISource } from "@json_out/meta/ISource.js";
import type { IIronswornRegionYaml } from "@yaml_in/index.js";

/**
 * @internal
 */

export class IronswornRegion implements IIronswornRegion {
  $id: string;
  Name: string;
  Summary: string;
  Display: IDisplay;
  Source: ISource;
  Features: string[];
  Tags?: string[] | undefined;
  Description: string;
  "Quest Starter": string;

  constructor(json: IIronswornRegionYaml) {
    this.$id = `Ironsworn/Regions/${json.Name}`;
    this.Name = json.Name;
    this.Summary = json.Summary;
    this.Display = new DisplayWithTitle({ Title: json.Name });
    this.Source = json.Source;
    this.Features = json.Features;
    this.Description = json.Description;
    this.Description = json.Description;
  }
}
