import { DisplayWithTitle } from "@classes/common/Display.js";
import { Asset, SourceInheritor, Title } from "@classes/index.js";
import type { Gamespace , IAssetType, IAssetUsage, IDisplayWithTitle, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IAssetTypeYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetType extends SourceInheritor implements IAssetType {
  $id: IAssetType["$id"];
  Name?: string | undefined;
  Title: Title;
  Aliases?: string[] | undefined;
  Description: string;
  Assets: Asset[];
  Display: IDisplayWithTitle;
  Usage: IAssetUsage;
  constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource) {
    super(json.Source ?? {}, rootSource);
    this.$id = `${gamespace}/Assets/${formatIdFragment(json.Title.Short ?? json.Title.Canonical)}`;
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;

    this.Display = new DisplayWithTitle({
      Title: json.Display?.Title ?? json.Title.Canonical,
      Color: json.Display?.Color
    });

    this.Title = new Title(json.Title,this.$id,);

    const usage = _.clone(json.Usage ?? {}) as IAssetUsage;
    if (!usage.Shared) {
      usage.Shared = false;
    }
    this.Usage = usage;
    this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
  }
}

