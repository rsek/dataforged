import { Display } from "@classes/common/Display.js";
import { Asset, SourceInheritor, Title } from "@classes/index.js";
import type { Gamespace , IAssetType, IAssetUsage, IDisplay, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IAssetTypeYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetType extends SourceInheritor implements IAssetType {
  $id: IAssetType["$id"];
  Title: Title;
  Aliases?: string[] | undefined;
  Description: string;
  Assets: Asset[];
  Display: IDisplay;
  Usage: IAssetUsage;
  constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource) {
    super(json.Source ?? {}, rootSource);
    this.$id = `${gamespace}/Assets/${formatIdFragment(json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`;
    this.Aliases = json.Aliases;
    this.Description = json.Description;

    this.Display = new Display({
      Color: json.Display?.Color
    });

    this.Title = new Title(json.Title,this);

    const usage = _.clone(json.Usage ?? {}) as IAssetUsage;
    if (!usage.Shared) {
      usage.Shared = false;
    }
    this.Usage = usage;
    this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
  }
}

