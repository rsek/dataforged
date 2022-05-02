import { Asset, SourceInheritor } from "@classes/index.js";
import type { Gamespace , IAssetType, IAssetUsage, IDisplayWithTitle, ISource } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { toIdFragment } from "@utils/toIdFragment.js";
import { validateColor } from "@utils/validateColor.js";
import type { IAssetTypeYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetType extends SourceInheritor implements IAssetType {
  $id: IAssetType["$id"];
  Name: string;
  Aliases?: string[] | undefined;
  Description: string;
  Assets: Asset[];
  Display: IDisplayWithTitle;
  Usage: IAssetUsage;
  constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource) {
    super(json.Source ?? {}, rootSource);
    this.$id = `${gamespace}/Assets/${toIdFragment(json.Name)}`;
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;
    const display = _.clone(json.Display ?? {}) as IDisplayWithTitle;
    if (!display.Title) {
      display.Title = json.Name + "s";
    }
    this.Display = display;
    if (this.Display.Color && !validateColor(this.Display.Color)) {
      throw badJsonError(this.constructor, this.Display, "Not a valid color!");
    }
    const usage = _.clone(json.Usage ?? {}) as IAssetUsage;
    if (!usage.Shared) {
      usage.Shared = false;
    }
    this.Usage = usage;
    this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
  }
}

